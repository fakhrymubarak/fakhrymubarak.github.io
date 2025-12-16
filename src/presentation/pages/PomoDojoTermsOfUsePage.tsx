import React from 'react';
import SEO from '../components/SEO';

const htmlContent = `<div class="pomo-legal">
<h1>PomoDojo - Pomodoro Timer Terms of Use</h1>
<strong>Terms &amp; Conditions</strong>
<p>These Terms and Conditions govern your use of the PomoDojo - Pomodoro Timer application ("Application") provided by Fakhry Mubarak ("Service Provider"). By installing or using the Application, you agree to these terms.</p>
<br><strong>License</strong>
<p>The Service Provider grants you a limited, non-exclusive, non-transferable license to use the Application for personal, non-commercial purposes in accordance with these terms.</p>
<br><strong>User Obligations</strong>
<ul>
  <li>You will use the Application only for lawful purposes.</li>
  <li>You will not modify, reverse engineer, or distribute the Application without prior written consent.</li>
  <li>You are responsible for maintaining the confidentiality of your device and any data you store within the Application.</li>
</ul>
<br><strong>Intellectual Property</strong>
<p>All rights, title, and interest in and to the Application and its content remain with the Service Provider.</p>
<br><strong>Disclaimer of Warranties</strong>
<p>The Application is provided "AS IS" without warranties of any kind, whether express or implied. The Service Provider does not guarantee uninterrupted or error-free operation.</p>
<br><strong>Limitation of Liability</strong>
<p>To the maximum extent permitted by law, the Service Provider is not liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use or inability to use the Application.</p>
<br><strong>Termination</strong>
<p>The Service Provider may terminate or suspend access to the Application at any time without prior notice if you breach these terms.</p>
<br><strong>Changes to These Terms</strong>
<p>These Terms and Conditions may be updated from time to time. Continued use of the Application after changes are posted constitutes acceptance of the revised terms.</p>
<br><strong>Governing Law</strong>
<p>These terms are governed by the laws applicable in your jurisdiction, without regard to conflict of law principles.</p>
<br><strong>Contact</strong>
<p>For questions about these Terms and Conditions, contact the Service Provider at fakhrymubarak@gmail.com.</p>
</div>`;

const PomoDojoTermsOfUsePage: React.FC = () => {
  return (
    <>
      <SEO
        title="Terms & Conditions - PomoDojo"
        description="Terms and Conditions for the PomoDojo - Pomodoro Timer application."
        url="https://fakhrymubarak.github.io/pomodojo/terms"
      />
      <div
        className="pomo-legal"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </>
  );
};

export default PomoDojoTermsOfUsePage;
