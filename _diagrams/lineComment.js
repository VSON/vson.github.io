Diagram(
	Terminal('//'),
	OneOrMore(
		Skip(),
		NonTerminal('any unicode character except new line or carriage return')),
	Choice(0,
		NonTerminal('New line  (U+000A)'),
		NonTerminal('Carriage return  (U+000D)'),
		NonTerminal('EOF')))