export default function PrivacyPolicy() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="mb-8 font-heading text-4xl font-bold">Privacy Policy</h1>
      
      <div className="space-y-6 text-lg">
        <p>Last updated: {new Date().toLocaleDateString()}</p>

        <section>
          <h2 className="mb-4 font-heading text-2xl font-semibold">Information We Collect</h2>
          <p>
            This is a static blog site. We do not collect, store, or process any personal information 
            from our visitors. The site is built with static pages and does not require user registration 
            or account creation.
          </p>
        </section>

        <section>
          <h2 className="mb-4 font-heading text-2xl font-semibold">Cookies</h2>
          <p>
            This website uses Google AdSense to display advertisements. Google AdSense uses cookies 
            to serve ads based on your prior visits to this site and other sites on the internet. 
          </p>
          <p className="mt-4">
            The cookies used by Google AdSense may include:
          </p>
          <ul className="ml-6 mt-2 list-disc space-y-1">
            <li>DoubleClick DART cookies - Used to serve ads based on your interests</li>
            <li>Google Analytics cookies (if applicable) - Used to analyze site traffic</li>
          </ul>
          <p className="mt-4">
            You may opt out of the use of the DART cookie by visiting the{&apos; &apos;}
            <a 
              href="https://adssettings.google.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:text-primary"
            >
              Google Ad Settings
            </a>{&apos; &apos;}
            page.
          </p>
        </section>

        <section>
          <h2 className="mb-4 font-heading text-2xl font-semibold">Third-Party Advertising</h2>
          <p>
            Google, as a third-party vendor, uses cookies to serve ads on our site. Google&apos;s use 
            of the DART cookie enables it to serve advertisements to our users based on their 
            visit to our site and other sites on the internet.
          </p>
          <p className="mt-4">
            Users may opt out of the use of cookies for advertising purposes by visiting the{&apos; &apos;}
            <a 
              href="https://www.aboutads.info/choices/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:text-primary"
            >
              About Ads
            </a>{&apos; &apos;}
            page or by opting out through the{&apos; &apos;}
            <a 
              href="https://policies.google.com/technologies/ads" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:text-primary"
            >
              Google Advertising Policies
            </a>.
          </p>
        </section>

        <section>
          <h2 className="mb-4 font-heading text-2xl font-semibold">Third-Party Privacy Policies</h2>
          <p>
            This Privacy Policy does not apply to other advertisers or websites that may be linked 
            on our site. We encourage you to consult the respective Privacy Policies of these 
            third-party ad servers for more detailed information.
          </p>
        </section>

        <section>
          <h2 className="mb-4 font-heading text-2xl font-semibold">Changes to This Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes 
            by posting the new Privacy Policy on this page.
          </p>
        </section>

        <section>
          <h2 className="mb-4 font-heading text-2xl font-semibold">Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us through the 
            site&apos;s contact page.
          </p>
        </section>
      </div>
    </main>
  )
}
