from transformers import AutoModelForCausalLM, AutoTokenizer
import re


device = "cuda"  # the device to load the model onto


model_name_or_path = "TheBloke/Mistral-7B-Instruct-v0.1-GPTQ"
# To use a different branch, change revision
# For example: revision="gptq-4bit-32g-actorder_True"
model = AutoModelForCausalLM.from_pretrained(
    model_name_or_path,
    device_map="auto",
    trust_remote_code=False,
    revision="gptq-4bit-32g-actorder_True",
).cuda()

tokenizer = AutoTokenizer.from_pretrained(model_name_or_path, use_fast=True)

SYSTEM_PROMPT = "You are a helpful assistant, specializing in medical advice. Ensure clarity and accuracy in your responses."


def inject_system_prompt(message_history):
    prefix = "<|im_start|>"
    suffix = "<|im_end|>\n"
    sys_prompt = prefix + "System:\n" + SYSTEM_PROMPT + suffix
    user_prompt = prefix + "User:\n" + message_history[-1]["content"] + suffix
    message_history[-1]["content"] = sys_prompt + user_prompt + "\n Assistant:"
    return message_history


def extract_last_response(text):
    last_inst_index = text.rfind("[/INST]")
    if last_inst_index != -1:
        response_text = text[last_inst_index + len("[/INST]") : text.rfind("</s>")]
        return response_text.strip()
    return ""


def generate_response(message_history):
    message_history = inject_system_prompt(message_history)
    encodeds = tokenizer.apply_chat_template(message_history, return_tensors="pt")
    model_inputs = encodeds.to(device)
    output = model.generate(
        inputs=model_inputs,
        temperature=0.7,
        do_sample=True,
        top_p=0.95,
        top_k=40,
        max_new_tokens=512,
    )
    generated_ids = model.generate(model_inputs, max_new_tokens=1000, do_sample=True)
    decoded = tokenizer.batch_decode(generated_ids)
    return extract_last_response(decoded[0])
