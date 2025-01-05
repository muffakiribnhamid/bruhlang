import { motion } from 'framer-motion';

const Examples = () => {
  const examples = [
    {
      title: "Variables and Data Types",
      js: `let name = "John";
let age = 25;
let isActive = true;`,
      bruhlang: `flex name = "John"
flex age = 25
flex isActive = cap`
    },
    {
      title: "Functions",
      js: `function greet(name) {
  console.log("Hello " + name);
}

function isAdult(age) {
  return age >= 18;
}`,
      bruhlang: `flex greet = (name) fam
  say "Hello " + name
yo

flex isAdult = (age) fam
  keepIt age >= 18
yo`
    },
    {
      title: "Loops",
      js: `for (let i = 0; i < 5; i++) {
  console.log(i);
}`,
      bruhlang: `yoRepeat 5 fam
  say i
yo`
    },
    {
      title: "Conditionals",
      js: `if (score > 80) {
  console.log("Great job!");
} else {
  console.log("Keep trying!");
}`,
      bruhlang: `checkIf score > 80 fam
  say "Great job!"
nah
  say "Keep trying!"
yo`
    }
  ];

  return (
    <section id="examples" className="examples-section">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="section-title">Code Examples</h2>
        <div className="examples-grid">
          {examples.map((example, index) => (
            <motion.div
              key={index}
              className="example-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h3>{example.title}</h3>
              <div className="code-comparison">
                <div className="code-block">
                  <h4>JavaScript</h4>
                  <pre>
                    <code>{example.js}</code>
                  </pre>
                </div>
                <div className="code-block">
                  <h4>BruhLang</h4>
                  <pre>
                    <code>{example.bruhlang}</code>
                  </pre>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Examples;
