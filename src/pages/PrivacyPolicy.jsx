import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-[#1a1d21] text-white">
      <div className="max-w-4xl mx-auto p-8">
        {/* Back button */}
        <Link 
          to="/dashboard" 
          className="inline-block mb-8 text-blue-400 hover:text-blue-300"
        >
          ← Back to Dashboard
        </Link>

        <article className="prose prose-invert prose-lg max-w-none">
          <h1>Privacy Policy</h1>
          <p>Last updated: February 27, 2025</p>
          
          <p>This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.</p>
          
          <p>We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy. This Privacy Policy has been created with the help of the <a href="https://www.termsfeed.com/privacy-policy-generator/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">Privacy Policy Generator</a>.</p>
          
          <h2>Interpretation and Definitions</h2>
          <h3>Interpretation</h3>
          <p>The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>
          
          <h3>Definitions</h3>
          <p>For the purposes of this Privacy Policy:</p>
          <ul>
            <li><strong>Account</strong> means a unique account created for You to access our Service or parts of our Service.</li>
            <li><strong>Affiliate</strong> means an entity that controls, is controlled by or is under common control with a party, where "control" means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.</li>
            <li><strong>Company</strong> (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to tacit.AI.</li>
            {/* ... Continue with all list items ... */}
          </ul>

          {/* ... Continue with all sections ... */}

          <h2>Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, You can contact us:</p>
          <ul>
            <li>By email: <a href="mailto:aanand1_be19@thapar.edu" className="text-blue-400 hover:text-blue-300">aanand1_be19@thapar.edu</a></li>
          </ul>
        </article>
      </div>
    </div>
  );
};

export default PrivacyPolicy; 