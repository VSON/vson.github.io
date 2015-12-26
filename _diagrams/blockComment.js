Diagram(
	Terminal('/*'),
	OneOrMore(
		Sequence(
			OneOrMore(
				Skip(),
				NonTerminal('any unicode character except *')),
			OneOrMore(Terminal('*')))),
	Terminal('/'))