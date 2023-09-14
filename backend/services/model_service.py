from transformers import GPT2LMHeadModel, GPT2Tokenizer

# Constants
MAX_TOKENS = 1024

# Initialize the model and tokenizer
tokenizer = GPT2Tokenizer.from_pretrained("gpt2")
model = GPT2LMHeadModel.from_pretrained("gpt2")

tokenizer.pad_token = tokenizer.eos_token

# Experimental
conversation_history = []

def trim_conversation_to_fit(input_text, conversation):
    """
    Trims the conversation history to fit within the model's maximum token limit.
    
    Parameters:
        input_text (str): The latest user input.
        conversation (list): The full conversation history.
        
    Returns:
        list: The trimmed conversation history.
    """
    total_tokens = len(tokenizer.encode(input_text))
    trimmed_conversation = []
    
    for message in reversed(conversation[:4]):
        message_tokens = len(tokenizer.encode(message))
        
        if total_tokens + message_tokens <= MAX_TOKENS:
            trimmed_conversation.insert(0, message)
            total_tokens += message_tokens
        else:
            break
    
    return trimmed_conversation

def get_template(input_text):
    return "You are MediBot. Respond concisely: "

def preprocess_input(input_text, template):
    """Prepares the input for the model.

    Args:
        input_text (str): The raw input text.
        template (str): The template to use for the input.

    Returns:
        str: The preprocessed input text.
    """
    preprocessed_input = template + input_text

    trimmed_conversation = trim_conversation_to_fit(preprocessed_input, conversation_history)
    preprocessed_input = ' '.join(trimmed_conversation) + preprocessed_input

    print("Length of conversation so far: " + str(len(preprocessed_input)))
    print(preprocessed_input)
    return preprocessed_input

def postprocess_output(raw_output, input_text, template):
    """Postprocesses the model output.

    Args:
        raw_output list[str]: The raw model output.
        template (str): The template used for the input.

    Returns:
        str: The postprocessed output text.
    """
    response = tokenizer.decode(raw_output[0], skip_special_tokens=True)
    response = response.replace(template, '')
    response = response.replace(input_text, '')

    # Remove conversation history from the response
    for message in conversation_history:
        response = response.replace(message, '')

    # Post-process to keep only complete sentences
    sentences = response.split('. ')
    postprocessed_output = '. '.join(sentences[:-1]) + '.' if sentences else ''
    
    return postprocessed_output

def generate_response(input_text):
    template = get_template(input_text)
    
    preprocessed_input = preprocess_input(input_text, template)

    inputs = tokenizer(
        preprocessed_input, 
        return_tensors='pt', 
        padding=True, 
        truncation=True, 
        max_length=MAX_TOKENS - 100, 
        add_special_tokens=True 
    )

    desired_response_length = inputs['input_ids'].shape[1] + 100

    outputs = model.generate(
        input_ids=inputs['input_ids'], 
        attention_mask=inputs['attention_mask'],  
        max_length=desired_response_length,
        num_return_sequences=1, 
        no_repeat_ngram_size=2,
        temperature=0.3,
        do_sample=True,
        top_k=20
    )

    postprocessed_output = postprocess_output(outputs, input_text, template)

    conversation_history.append(f"User: {input_text}")
    conversation_history.append(f"MediBot: {postprocessed_output}")
    
    return postprocessed_output

def reset_conversation():
    global conversation_history
    conversation_history = []