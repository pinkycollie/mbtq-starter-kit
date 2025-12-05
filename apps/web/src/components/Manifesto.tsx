export default function Manifesto() {
  return (
    <aside className="p-8 bg-gradient-to-br from-fuchsia-100 via-blue-50 to-yellow-100 rounded shadow-lg m-4 text-xl font-bold text-fuchsia-700 border-2 border-fuchsia-600">
      <h2 className="text-3xl mb-2">Our Commitment</h2>
      <p className="text-base text-blue-700 mb-4 font-normal">
        This platform provides a safe hosting space for LGBTQ+ and Deaf developers to build, create, and collaborate.
      </p>
      <ul className="list-disc ml-6 mt-4 text-base text-blue-800 space-y-2">
        <li><strong>Safety First:</strong> Privacy controls, pseudonymous profiles, and community moderation.</li>
        <li><strong>Deaf-Accessible:</strong> Visual alerts, no audio-only features, captions required.</li>
        <li><strong>LGBTQ+ Friendly:</strong> Respect pronouns, identities, and chosen names always.</li>
        <li><strong>Community Owned:</strong> Your data, your rules. Export or delete anytime.</li>
        <li><strong>Radically Inclusive:</strong> Design for the margins; everyone benefits.</li>
        <li><strong>Open Source:</strong> Transparent code, community governance, no vendor lock-in.</li>
      </ul>
      <p className="text-sm text-gray-700 mt-4 font-normal italic">
        Read our <a href="/CODE_OF_CONDUCT.md" className="underline text-fuchsia-700 hover:text-fuchsia-900">Code of Conduct</a> and <a href="/SAFETY.md" className="underline text-fuchsia-700 hover:text-fuchsia-900">Safety Features</a>.
      </p>
    </aside>
  );
}
