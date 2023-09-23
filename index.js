type: 'module'
import inquirer from 'inquirer';
const svgToFile = require('svg-to-png-file');

const shapes = ['circle', 'triangle', 'square'];

const generateLogo = async (input) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200">
    <${input.shape} fill="${input.shapeColor}" />
    <text x="150" y="100" font-size="48" fill="${input.textColor}">${input.text}</text>
  </svg>`;

  await svgToFile.save(svg, 'logo.svg');

  console.log('Generated logo.svg');
};

(async () => {
  const input = await inquirer.prompt([
    {
      type: 'input',
      name: 'text',
      message: 'Enter text for your logo (up to 3 characters): ',
      validate: (value) => {
        if (value.length > 3) {
          return 'Text must be up to 3 characters long.';
        }

        return true;
      },
    },
    {
      type: 'input',
      name: 'textColor',
      message: 'Enter the text color (keyword or hex): ',
      validate: (value) => {
        if (!/^(#[0-9a-fA-F]{6}|[a-z]+)$/.test(value)) {
          return 'Invalid color.';
        }

        return true;
      },
    },
    {
      type: 'list',
      name: 'shape',
      message: 'Choose a shape for your logo: ',
      choices: shapes,
    },
    {
      type: 'input',
      name: 'shapeColor',
      message: 'Enter the shape color (keyword or hex): ',
      validate: (value) => {
        if (!/^(#[0-9a-fA-F]{6}|[a-z]+)$/.test(value)) {
          return 'Invalid color.';
        }

        return true;
      },
    },
  ]);

  await generateLogo(input);
})();
