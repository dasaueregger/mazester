module.exports = {
    "extends": "google",
    "rules":{
      'require-jsdoc': [2, {
        require: {
          FunctionDeclaration: false,
          MethodDefinition: false,
          ClassDeclaration: false,
        },
      }],

    },
    "parserOptions": {
        "ecmaVersion": 6,
    },
 
       
};