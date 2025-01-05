import { TokenType } from './lexer.js';

export class ASTNode {
    constructor(type) {
        this.type = type;
    }
}

export class Program extends ASTNode {
    constructor(statements) {
        super('Program');
        this.statements = statements;
    }
}

export class VariableDeclaration extends ASTNode {
    constructor(identifier, type, initializer, isConstant) {
        super('VariableDeclaration');
        this.identifier = identifier;
        this.type = type;
        this.initializer = initializer;
        this.isConstant = isConstant;
    }
}

export class FunctionDeclaration extends ASTNode {
    constructor(name, params, returnType, body) {
        super('FunctionDeclaration');
        this.name = name;
        this.params = params;
        this.returnType = returnType;
        this.body = body;
    }
}

export class ClassDeclaration extends ASTNode {
    constructor(name, properties, methods) {
        super('ClassDeclaration');
        this.name = name;
        this.properties = properties;
        this.methods = methods;
    }
}

export class Parser {
    constructor(lexer) {
        this.lexer = lexer;
        this.currentToken = this.lexer.getNextToken();
    }

    eat(tokenType) {
        if (this.currentToken.type === tokenType) {
            const token = this.currentToken;
            this.currentToken = this.lexer.getNextToken();
            return token;
        }
        throw new Error(`Expected ${tokenType} but got ${this.currentToken.type}`);
    }

    parseProgram() {
        const statements = [];
        while (this.currentToken.type !== TokenType.EOF) {
            statements.push(this.parseStatement());
        }
        return new Program(statements);
    }

    parseStatement() {
        switch (this.currentToken.type) {
            case TokenType.LET:
            case TokenType.CONST:
                return this.parseVariableDeclaration();
            case TokenType.FN:
                return this.parseFunctionDeclaration();
            case TokenType.CLASS:
                return this.parseClassDeclaration();
            default:
                return this.parseExpression();
        }
    }

    parseVariableDeclaration() {
        const isConstant = this.currentToken.type === TokenType.CONST;
        this.eat(isConstant ? TokenType.CONST : TokenType.LET);
        
        const identifier = this.eat(TokenType.IDENTIFIER).value;
        let type = null;
        
        if (this.currentToken.type === TokenType.COLON) {
            this.eat(TokenType.COLON);
            type = this.eat(TokenType.IDENTIFIER).value;
        }
        
        this.eat(TokenType.ASSIGN);
        const initializer = this.parseExpression();
        this.eat(TokenType.SEMICOLON);
        
        return new VariableDeclaration(identifier, type, initializer, isConstant);
    }

    parseFunctionDeclaration() {
        this.eat(TokenType.FN);
        const name = this.eat(TokenType.IDENTIFIER).value;
        this.eat(TokenType.LPAREN);
        
        const params = [];
        while (this.currentToken.type !== TokenType.RPAREN) {
            const paramName = this.eat(TokenType.IDENTIFIER).value;
            this.eat(TokenType.COLON);
            const paramType = this.eat(TokenType.IDENTIFIER).value;
            params.push({ name: paramName, type: paramType });
            
            if (this.currentToken.type === TokenType.COMMA) {
                this.eat(TokenType.COMMA);
            }
        }
        
        this.eat(TokenType.RPAREN);
        
        let returnType = null;
        if (this.currentToken.type === TokenType.COLON) {
            this.eat(TokenType.COLON);
            returnType = this.eat(TokenType.IDENTIFIER).value;
        }
        
        const body = this.parseBlock();
        
        return new FunctionDeclaration(name, params, returnType, body);
    }

    parseClassDeclaration() {
        this.eat(TokenType.CLASS);
        const name = this.eat(TokenType.IDENTIFIER).value;
        this.eat(TokenType.LBRACE);
        
        const properties = [];
        const methods = [];
        
        while (this.currentToken.type !== TokenType.RBRACE) {
            if (this.currentToken.type === TokenType.FN) {
                methods.push(this.parseFunctionDeclaration());
            } else {
                properties.push(this.parseVariableDeclaration());
            }
        }
        
        this.eat(TokenType.RBRACE);
        
        return new ClassDeclaration(name, properties, methods);
    }

    parseBlock() {
        this.eat(TokenType.LBRACE);
        const statements = [];
        
        while (this.currentToken.type !== TokenType.RBRACE) {
            statements.push(this.parseStatement());
        }
        
        this.eat(TokenType.RBRACE);
        return statements;
    }

    parseExpression() {
        // Basic expression parsing - can be expanded for more complex expressions
        const token = this.currentToken;
        switch (token.type) {
            case TokenType.NUMBER:
                this.eat(TokenType.NUMBER);
                return { type: 'NumberLiteral', value: token.value };
            case TokenType.STRING:
                this.eat(TokenType.STRING);
                return { type: 'StringLiteral', value: token.value };
            case TokenType.IDENTIFIER:
                this.eat(TokenType.IDENTIFIER);
                return { type: 'Identifier', name: token.value };
            default:
                throw new Error(`Unexpected token: ${token.type}`);
        }
    }
}
