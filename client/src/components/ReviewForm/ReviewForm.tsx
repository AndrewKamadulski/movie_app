import { useState } from 'react';

export const ReviewForm = () => {

    const [reviewText, setText] = useState('');
    const [characterCount, setCharacterCount] = useState(0);
    const [error, setError] = useState(false); 

    const handleChange = event => {
        if (event.target.value.length <= 280) {
          setText(event.target.value);
          setCharacterCount(event.target.value.length);
        }
      };

      
      const handleFormSubmit = async event => {        
        event.preventDefault()      
        try {
            console.log("post function goes here!")
          
       
          setText('');
          setCharacterCount(0);
        } catch (e) {
          console.error(e);
        }
      };

    return(
        <div>
                    <p className={`m-0 ${characterCount === 280 || error ? 'text-error' : ''}`}>
        Character Count: {characterCount}/280
        {error && <span className="ml-2">Something went wrong...</span>}
        </p>
        <form className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit}>
            <textarea
            placeholder="Leave a Comment..."
            value={reviewText}
            className="form-input col-12 col-md-9"
            onChange={handleChange}
            ></textarea>
            <button className="btn col-1 m-5 btn-light" type="submit">
            Submit
            </button>
        </form>
        </div>
    );
}