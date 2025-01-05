// Token types
export const TokenType = {
    // Keywords
    LET: 'LET',
    CONST: 'CONST',
    FN: 'FN',
    IF: 'IF',
    ELSE: 'ELSE',
    RETURN: 'RETURN',
    CLASS: 'CLASS',
    
    // Literals
    NUMBER: 'NUMBER',
    STRING: 'STRING',
    IDENTIFIER: 'IDENTIFIER',
    
    // Operators
    PLUS: 'PLUS',
    MINUS: 'MINUS',
    MULTIPLY: 'MULTIPLY',
    DIVIDE: 'DIVIDE',
    ASSIGN: 'ASSIGN',
    
    // Delimiters
    LPAREN: 'LPAREN',
    RPAREN: 'RPAREN',
    LBRACE: 'LBRACE',
    RBRACE: 'RBRACE',
    SEMICOLON: 'SEMICOLON',
    COLON: 'COLON',
    COMMA: 'COMMA',
    
    EOF: 'EOF'
};

export class Token {
    constructor(type, value, line, column) {
        this.type = type;
        this.value = value;
        this.line = line;
        this.column = column;
    }
}

export class Lexer {
    constructor(input) {
        this.input = input;
        this.position = 0;
        this.line = 1;
        this.column = 1;
        this.currentChar = this.input[this.position];
    }

    advance() {
        this.position++;
        if (this.currentChar === '\n') {
            this.line++;
            this.column = 1;
        } else {
            this.column++;
        }
        this.currentChar = this.position < this.input.length ? this.input[this.position] : null;
    }

    skipWhitespace() {
        while (this.currentChar && /\s/.test(this.currentChar)) {
            this.advance();
        }
    }

    skipComment() {
        while (this.currentChar && this.currentChar !== '\n') {
            this.advance();
        }
        if (this.currentChar === '\n') {
            this.advance();
        }
    }

    readNumber() {
        let result = '';
        while (this.currentChar && /\d/.test(this.currentChar)) {
            result += this.currentChar;
            this.advance();
        }
        if (this.currentChar === '.') {
            result += this.currentChar;
            this.advance();
            while (this.currentChar && /\d/.test(this.currentChar)) {
                result += this.currentChar;
                this.advance();
            }
        }
        return new Token(TokenType.NUMBER, parseFloat(result), this.line, this.column);
    }

    readIdentifier() {
        let result = '';
        while (this.currentChar && /[a-zA-Z0-9_]/.test(this.currentChar)) {
            result += this.currentChar;
            this.advance();
        }
        
        // Check for keywords
        const keywords = {
            'let': TokenType.LET,
            'const': TokenType.CONST,
            'fn': TokenType.FN,
            'if': TokenType.IF,
            'else': TokenType.ELSE,
            'return': TokenType.RETURN,
            'class': TokenType.CLASS
        };
        
        const type = keywords[result] || TokenType.IDENTIFIER;
        return new Token(type, result, this.line, this.column);
    }

    readString() {
        let result = '';
        const quote = this.currentChar;
        this.advance(); // Skip opening quote
        
        while (this.currentChar && this.currentChar !== quote) {
            if (this.currentChar === '\\') {
                this.advance();
                switch (this.currentChar) {
                    case 'n': result += '\n'; break;
                    case 't': result += '\t'; break;
                    case 'r': result += '\r'; break;
                    default: result += this.currentChar;
                }
            } else {
                result += this.currentChar;
            }
            this.advance();
        }
        
        if (this.currentChar === quote) {
            this.advance(); // Skip closing quote
        }
        
        return new Token(TokenType.STRING, result, this.line, this.column);
    }

    getNextToken() {
        while (this.currentChar) {
            // Skip whitespace
            if (/\s/.test(this.currentChar)) {
                this.skipWhitespace();
                continue;
            }

            // Skip comments
            if (this.currentChar === '/' && this.input[this.position + 1] === '/') {
                this.skipComment();
                continue;
            }

            // Numbers
            if (/\d/.test(this.currentChar)) {
                return this.readNumber();
            }

            // Identifiers and keywords
            if (/[a-zA-Z_]/.test(this.currentChar)) {
                return this.readIdentifier();
            }

            // Strings
            if (this.currentChar === '"' || this.currentChar === "'") {
                return this.readString();
            }

            // Single-character tokens
            switch (this.currentChar) {
                case '+': this.advance(); return new Token(TokenType.PLUS, '+', this.line, this.column);
                case '-': this.advance(); return new Token(TokenType.MINUS, '-', this.line, this.column);
                case '*': this.advance(); return new Token(TokenType.MULTIPLY, '*', this.line, this.column);
                case '/': this.advance(); return new Token(TokenType.DIVIDE, '/', this.line, this.column);
                case '=': this.advance(); return new Token(TokenType.ASSIGN, '=', this.line, this.column);
                case '(': this.advance(); return new Token(TokenType.LPAREN, '(', this.line, this.column);
                case ')': this.advance(); return new Token(TokenType.RPAREN, ')', this.line, this.column);
                case '{': this.advance(); return new Token(TokenType.LBRACE, '{', this.line, this.column);
                case '}': this.advance(); return new Token(TokenType.RBRACE, '}', this.line, this.column);
                case ';': this.advance(); return new Token(TokenType.SEMICOLON, ';', this.line, this.column);
                case ':': this.advance(); return new Token(TokenType.COLON, ':', this.line, this.column);
                case ',': this.advance(); return new Token(TokenType.COMMA, ',', this.line, this.column);
            }

            throw new Error(`Unexpected character: ${this.currentChar} at line ${this.line}, column ${this.column}`);
        }

        return new Token(TokenType.EOF, null, this.line, this.column);
    }
}
