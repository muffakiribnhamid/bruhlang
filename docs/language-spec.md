# BruhLang Language Specification

## Overview

BruhLang is designed to be an approachable, fun programming language that maintains functionality while using more casual, engaging syntax.

## Language Elements

### Keywords

- `flex` - Variable declaration
- `say` - Print/output statement
- `yoRepeat` - Loop construct
- `fam` - Block starter
- `yo` - Block ender
- `checkIf` - Conditional statement
- `nah` - Else statement
- `keepIt` - Assignment/declaration
- `cap` - Boolean true
- `nocap` - Boolean false

### Data Types

1. **Numbers**
   - Integers: `42`
   - Floating point: `3.14`

2. **Strings**
   - Single quotes: `'Hello'`
   - Double quotes: `"World"`
   - Support escape characters: `"Line1\nLine2"`

3. **Booleans**
   - `cap` (true)
   - `nocap` (false)

4. **Arrays**
   - Declared using brackets: `[1, 2, 3]`

### Control Structures

#### Conditionals
```bruhlang
checkIf condition fam
    # code block
nah
    # else block
yo
```

#### Loops
```bruhlang
yoRepeat count fam
    # code block
yo
```

### Variables

```bruhlang
flex name = "John"
flex age = 25
flex isCool = cap
```

### Functions

```bruhlang
flex greet = (name) fam
    say "Yo " + name + "!"
yo
```

## Error Handling

The compiler provides clear, friendly error messages with line numbers and suggestions for fixes.

## Standard Library

### Built-in Functions

1. `say()` - Output to console
2. `input()` - Get user input
3. `len()` - Get length of strings/arrays
4. `type()` - Get type of value

### Math Operations

- Addition: `+`
- Subtraction: `-`
- Multiplication: `*`
- Division: `/`
- Modulus: `%`

### Comparison Operators

- Equal to: `==`
- Not equal to: `!=`
- Greater than: `>`
- Less than: `<`
- Greater than or equal to: `>=`
- Less than or equal to: `<=`

## Best Practices

1. Use meaningful variable names
2. Comment your code using `#`
3. Maintain consistent indentation
4. Break complex operations into smaller functions
5. Handle errors appropriately
