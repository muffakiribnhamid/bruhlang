import { motion } from 'framer-motion';

const Documentation = () => {
  const docs = [
    {
      title: "Keywords",
      items: [
        { name: "flex", description: "Variable declaration" },
        { name: "say", description: "Print/output statement" },
        { name: "yoRepeat", description: "Loop construct" },
        { name: "fam", description: "Block starter" },
        { name: "yo", description: "Block ender" },
        { name: "checkIf", description: "Conditional statement" },
        { name: "nah", description: "Else statement" },
        { name: "keepIt", description: "Assignment/declaration" },
        { name: "cap", description: "Boolean true" },
        { name: "nocap", description: "Boolean false" }
      ]
    },
    {
      title: "Data Types",
      items: [
        { name: "Numbers", description: "Integers (42) and floating point (3.14)" },
        { name: "Strings", description: "Text in single ('Hello') or double quotes (\"World\")" },
        { name: "Booleans", description: "cap (true) and nocap (false)" },
        { name: "Arrays", description: "Lists of values [1, 2, 3]" }
      ]
    },
    {
      title: "Control Structures",
      items: [
        { name: "Conditionals", description: "checkIf, nah for if-else statements" },
        { name: "Loops", description: "yoRepeat for iteration" },
        { name: "Functions", description: "flex for function declarations" }
      ]
    },
    {
      title: "Built-in Functions",
      items: [
        { name: "say()", description: "Output to console" },
        { name: "input()", description: "Get user input" },
        { name: "len()", description: "Get length of strings/arrays" },
        { name: "type()", description: "Get type of value" }
      ]
    }
  ];

  return (
    <section id="docs" className="docs-section">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="section-title">Documentation</h2>
        <div className="docs-grid">
          {docs.map((section, index) => (
            <motion.div
              key={index}
              className="doc-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h3>{section.title}</h3>
              <div className="doc-items">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="doc-item">
                    <code className="doc-item-name">{item.name}</code>
                    <p className="doc-item-description">{item.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Documentation;
