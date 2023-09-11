from transformers import GPT2LMHeadModel, GPT2Tokenizer
from flask import request, jsonify

tokenizer = GPT2Tokenizer.from_pretrained("gpt2")
model = GPT2LMHeadModel.from_pretrained("gpt2")

def generate_response(input_text):
    template = "You are a medical assistant named MediBot. Please provide a short, helpful and professional response to the following query: "
    
    combined_input = template + input_text
    
    tokenizer.pad_token = tokenizer.eos_token

    inputs = tokenizer(
        combined_input, 
        return_tensors='pt', 
        padding=True, 
        truncation=True, 
        max_length=200, 
        add_special_tokens=True 
    )

    outputs = model.generate(
        input_ids=inputs['input_ids'], 
        attention_mask=inputs['attention_mask'],  
        max_length=100,  # Increased max_length for initial generation
        num_return_sequences=1, 
        no_repeat_ngram_size=2,
        temperature=0.2,
        top_k=50
    )

    response = tokenizer.decode(outputs[0], skip_special_tokens=True)
    response = response.replace(template, '')
    response = response.replace(input_text, '')

    # Post-process to keep only complete sentences
    sentences = response.split('. ')
    complete_sentences = '. '.join(sentences[:-1]) + '.' if sentences else ''
    
    return complete_sentences


def set_routes(app):
    @app.route('/api/hello')
    def hello_world():
        return 'Hello, World!'

    @app.route('/api/generate', methods=['POST'])
    def generate():
        data = request.get_json()
        input_text = data.get('input_text')
        response = generate_response(input_text)
        return jsonify({'response': response})
