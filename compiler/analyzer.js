export class Symbol {
    constructor(name, type) {
        this.name = name;
        this.type = type;
    }
}

export class SymbolTable {
    constructor(parent = null) {
        this.symbols = new Map();
        this.parent = parent;
    }

    define(symbol) {
        this.symbols.set(symbol.name, symbol);
    }

    lookup(name) {
        let symbol = this.symbols.get(name);
        if (symbol) return symbol;
        if (this.parent) return this.parent.lookup(name);
        return null;
    }
}

export class SemanticAnalyzer {
    constructor() {
        this.currentScope = new SymbolTable();
        this.errors = [];
    }

    visitProgram(node) {
        node.statements.forEach(statement => this.visit(statement));
    }

    visitVariableDeclaration(node) {
        // Check if variable is already defined in current scope
        if (this.currentScope.lookup(node.identifier)) {
            this.errors.push(`Variable ${node.identifier} is already defined`);
            return;
        }

        // Check type compatibility
        const initializerType = this.getExpressionType(node.initializer);
        if (node.type && initializerType !== node.type) {
            this.errors.push(`Type mismatch: expected ${node.type} but got ${initializerType}`);
            return;
        }

        // Add to symbol table
        this.currentScope.define(new Symbol(
            node.identifier,
            node.type || initializerType
        ));
    }

    visitFunctionDeclaration(node) {
        // Check if function is already defined
        if (this.currentScope.lookup(node.name)) {
            this.errors.push(`Function ${node.name} is already defined`);
            return;
        }

        // Create new scope for function body
        const functionScope = new SymbolTable(this.currentScope);
        const oldScope = this.currentScope;
        this.currentScope = functionScope;

        // Add parameters to function scope
        node.params.forEach(param => {
            if (functionScope.lookup(param.name)) {
                this.errors.push(`Parameter ${param.name} is already defined`);
                return;
            }
            functionScope.define(new Symbol(param.name, param.type));
        });

        // Analyze function body
        node.body.forEach(statement => this.visit(statement));

        // Check return type
        if (node.returnType) {
            const returnStatements = this.findReturnStatements(node.body);
            returnStatements.forEach(returnStmt => {
                const returnType = this.getExpressionType(returnStmt.expression);
                if (returnType !== node.returnType) {
                    this.errors.push(`Return type mismatch: expected ${node.returnType} but got ${returnType}`);
                }
            });
        }

        // Restore old scope
        this.currentScope = oldScope;

        // Add function to symbol table
        this.currentScope.define(new Symbol(
            node.name,
            {
                type: 'function',
                params: node.params,
                returnType: node.returnType
            }
        ));
    }

    visitClassDeclaration(node) {
        // Check if class is already defined
        if (this.currentScope.lookup(node.name)) {
            this.errors.push(`Class ${node.name} is already defined`);
            return;
        }

        // Create new scope for class members
        const classScope = new SymbolTable(this.currentScope);
        const oldScope = this.currentScope;
        this.currentScope = classScope;

        // Analyze properties
        node.properties.forEach(prop => this.visit(prop));

        // Analyze methods
        node.methods.forEach(method => this.visit(method));

        // Restore old scope
        this.currentScope = oldScope;

        // Add class to symbol table
        this.currentScope.define(new Symbol(
            node.name,
            {
                type: 'class',
                properties: node.properties,
                methods: node.methods
            }
        ));
    }

    getExpressionType(expression) {
        switch (expression.type) {
            case 'NumberLiteral':
                return 'number';
            case 'StringLiteral':
                return 'string';
            case 'Identifier':
                const symbol = this.currentScope.lookup(expression.name);
                return symbol ? symbol.type : null;
            default:
                return null;
        }
    }

    findReturnStatements(statements) {
        const returnStmts = [];
        const findReturns = (stmts) => {
            stmts.forEach(stmt => {
                if (stmt.type === 'ReturnStatement') {
                    returnStmts.push(stmt);
                } else if (stmt.body) {
                    findReturns(stmt.body);
                }
            });
        };
        findReturns(statements);
        return returnStmts;
    }

    visit(node) {
        const methodName = `visit${node.type}`;
        if (this[methodName]) {
            return this[methodName](node);
        }
        throw new Error(`No visit method for ${node.type}`);
    }

    analyze(ast) {
        this.visit(ast);
        return this.errors;
    }
}
