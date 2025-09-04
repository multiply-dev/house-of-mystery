import "./FormScreen.css";
import submitButton from "../../assets/buttons/submit.png";
import laststep from "../../assets/base/Last Step.png";

import { useState } from 'react';
import jsonp from 'jsonp';

const FormScreen = ({ onSubmit, selectedPotions }) => {
  const MailchimpURL = process.env.REACT_APP_MAILCHIMP;
  const [fname, setFName] = useState('');
  const [lname, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [flavor, setFlavor] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = e => {
    setIsSubmitting(true);
    setError(null);
    e.preventDefault();
    const url = MailchimpURL;
    const formName = encodeURIComponent("HouseOfMystery");
    const guess = selectedPotions[0].flavor + ", " + selectedPotions[1].flavor
    jsonp(`${url}&FNAME=${fname}&LNAME=${lname}&EMAIL=${email}&FORM=${formName}&FLAVOR=${flavor}&MYS_GUESS=${guess}&ACCEPTS_MARKETING=true`, { param: 'c' }, (err, data) => {
      if (err) {
        // Handle error
        setIsSubmitting(false);
        setError('An error occurred. Please try again.');
      } else {
        setIsSubmitting(false);
        onSubmit();
      }  
    });
  };

  return (
    <div className="form-screen">
      <div>
      <img src={laststep} alt="Last Step" className="last-step" />
      <h1 className='question-text'>FILL OUT YOUR INFO FOR A CHANCE TO WIN</h1>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form 
          id="mc-embedded-subscribe-form" 
          className="form-container"
          name="mc-embedded-subscribe-form"
          onSubmit={handleSubmit}>
        <div className="questions-container">
          <div className="sign-up-text">Sign up for our newsletter<sup>*</sup></div>
          <input
            id="mce-FNAME"
          name="FNAME"
          type="text"
          value={fname}
          onChange={(e) => setFName(e.target.value)}
          placeholder="First Name"
          required
          />
          <input
            id="mce-LNAME"
          name="LNAME"
          type="text"
          value={lname}
          onChange={(e) => setLName(e.target.value)}
          placeholder="Last Name"
          required
          />
          <input
            id="mce-EMAIL"
          name="EMAIL"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          required
          />
          <input
            id="mce-FLAVOR"
          name="FLAVOR"
          type="text"
          value={flavor}
          onChange={(e) => setFlavor(e.target.value)}
          placeholder="Favorite Flavor"
          required
          />
        </div>

        <button className="submit-button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : <img src={submitButton} alt="Submit" />}
        </button>
      </form>

      <p className="disclaimer-text"><em>*Subscribers will receive updates on new flavor launches, promotional deals, upcoming events, etc.</em></p>
    </div>
  );
};

export default FormScreen;