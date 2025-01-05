export class CodeGenerator {
    constructor() {
        this.output = '';
        this.indentLevel = 0;
    }

    indent() {
        return '  '.repeat(this.indentLevel);
    }

    visitProgram(node) {
        node.statements.forEach(statement => {
            this.output += this.visit(statement);
        });
        return this.output;
    }

    visitVariableDeclaration(node) {
        const declaration = node.isConstant ? 'const' : 'let';
        const type = node.type ? `: ${node.type}` : '';
        const value = this.visit(node.initializer);
        return `${this.indent()}${declaration} ${node.identifier}${type} = ${value};\n`;
    }

    visitFunctionDeclaration(node) {
        const params = node.params.map(param => 
            `${param.name}: ${param.type}`
        ).join(', ');
        
        const returnType = node.returnType ? `: ${node.returnType}` : '';
        
        this.indentLevel++;
        const body = node.body.forEach(statement => {
            this.output += this.visit(statement);
        });
        this.indentLevel--;
        
        return `${this.indent()}function ${node.name}(${params})${returnType} {\n${this.output}${this.indent()}}\n`;
    }

    visitClassDeclaration(node) {
        let output = `${this.indent()}class ${node.name} {\n`;
        this.indentLevel++;

        // Properties
        node.properties.forEach(prop => {
            output += this.visit(prop);
        });

        // Methods
        node.methods.forEach(method => {
            output += this.visit(method);
        });

        this.indentLevel--;
        output += `${this.indent()}}\n`;

        return output;
    }

    visitReturnStatement(node) {
        const expression = this.visit(node.expression);
        return `${this.indent()}return ${expression};\n`;
    }

    visitIfStatement(node) {
        let output = `${this.indent()}if (${this.visit(node.condition)}) {\n`;
        this.indentLevel++;
        
        node.consequent.forEach(statement => {
            output += this.visit(statement);
        });
        
        this.indentLevel--;
        output += `${this.indent()}}\n`;
        
        if (node.alternate) {
            output += `${this.indent()}else {\n`;
            this.indentLevel++;
            
            node.alternate.forEach(statement => {
                output += this.visit(statement);
            });
            
            this.indentLevel--;
            output += `${this.indent()}}\n`;
        }
        
        return output;
    }

    visitBinaryExpression(node) {
        const left = this.visit(node.left);
        const right = this.visit(node.right);
        return `${left} ${node.operator} ${right}`;
    }

    visitNumberLiteral(node) {
        return node.value.toString();
    }

    visitStringLiteral(node) {
        return `"${node.value}"`;
    }

    visitIdentifier(node) {
        return node.name;
    }

    visit(node) {
        const methodName = `visit${node.type}`;
        if (this[methodName]) {
            return this[methodName](node);
        }
        throw new Error(`No visit method for ${node.type}`);
    }

    generate(ast) {
        return this.visit(ast);
    }
}
