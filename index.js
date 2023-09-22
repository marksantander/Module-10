const inquirer = require('inquirer');
const svgjs = require('svg.js');

const generateLogo = async (answers) => {
  const { color, shape, text } = answers;

const doc = svgjs.Document();
const shapeElement = doc.element(shape);
shapeElement.attr('fill', color);

const textElement = doc.text(text);
doc.add(shapeElement);
doc.add(textElement);

await doc.save(`logo.${answers.format}`);
};

const main = async () => {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'color',
      message: 'Enter a color for the logo:',
    },
    {
      type: 'list',
      name: 'shape',
      message: 'Select a shape for the logo:',
      choices: ['circle', 'rectangle', 'triangle'],
    },
    {
      type: 'input',
      name: 'text',
      message: 'Enter text for the logo:',
    },
  ]);

await generateLogo(answers);

console.log('Logo created!');
};

main();