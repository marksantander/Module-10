const inquirer = require('inquirer');
const svgjs = require('../Module-10/node_modules/svg.js');

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
      //validate: validateColorKeyword,
    },
    {
      type: 'list',
      name: 'shape',
      message: 'Select a shape for the logo:',
      choices: ['circle', 'rtriangle', 'square'],
    },
    {
      type: 'input',
      name: 'text',
      message: 'Enter text for the logo:',
      validate: (input) => {
        if (input.length <= 3) {
          return true;
        } else {
          return 'Text must be no more than 3 characters long.';
        }
      },
    },
  ]);
    
  await generateLogo(answers);

  console.log('Generated logo.svg');
};

main();