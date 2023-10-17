from transformers import AutoModelForCausalLM, AutoTokenizer, TextIteratorStreamer
from threading import Thread


class MistralService:
    SYSTEM_PROMPT = "You are a helpful assistant, specializing in medical advice. Ensure clarity and accuracy in your responses."

    def __init__(self, socketio):
        self.socketio = socketio
        self.device = "cuda"
        self.model_name_or_path = "TheBloke/Mistral-7B-Instruct-v0.1-GPTQ"
        self.model = AutoModelForCausalLM.from_pretrained(
            self.model_name_or_path,
            device_map="auto",
            trust_remote_code=False,
            revision="gptq-4bit-32g-actorder_True",
        ).cuda()
        self.tokenizer = AutoTokenizer.from_pretrained(
            self.model_name_or_path, use_fast=True
        )
        self.streamer = TextIteratorStreamer(
            self.tokenizer, timeout=20.0, skip_prompt=True, skip_special_tokens=True
        )

    def inject_system_prompt(self, message_history):
        prefix = ""
        suffix = "\n"
        sys_prompt = prefix + "System:\n" + self.SYSTEM_PROMPT + suffix
        user_prompt = prefix + "User:\n" + message_history[-1]["content"] + suffix
        message_history[-1]["content"] = sys_prompt + user_prompt + "\n Assistant:"
        return message_history

    def stream_response(self, message_history):
        message_history = self.inject_system_prompt(message_history)
        encodeds = self.tokenizer.apply_chat_template(
            message_history, return_tensors="pt"
        )
        model_inputs = encodeds.to(self.device)

        generate_kwargs = dict(
            inputs=model_inputs,
            max_new_tokens=512,
            do_sample=True,
            top_p=0.95,
            top_k=40,
            temperature=0.7,
            streamer=self.streamer,
        )

        t = Thread(target=self.model.generate, kwargs=generate_kwargs)
        t.start()

        for new_text in self.streamer:
            self.socketio.emit("new_token", {"token": new_text})
