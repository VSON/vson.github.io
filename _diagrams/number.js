Diagram(
	Choice(0,
		Sequence(
			// sign
			Optional('-', 'skip'),
			Choice(0,
				Sequence(
					// value
					Choice(0,
						Terminal('0'),
						Sequence(NonTerminal('digit 1-9'), OneOrMore(Skip(), NonTerminal('digit')))),
					Optional(
						Sequence(
							Terminal('.'),
							OneOrMore(NonTerminal('digit')))),
					// exponent
					Choice(0,
						Skip(),
						Sequence(
							Choice(0, 'e', 'E'),
							Choice(1, '+', Skip(), '-'),
							OneOrMore(NonTerminal('digit'))))),
				Terminal('Infinity'))),
		Terminal('NaN')))
