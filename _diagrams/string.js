Diagram(
	Terminal('"'),
	ZeroOrMore(
		Choice(0,
			NonTerminal('string character'),
			Sequence(
				Terminal('\\'),
				Choice(0,
					Terminal('"'),
					Terminal('\\'),
					Terminal('/'),
					Terminal('b'),
					Terminal('f'),
					Terminal('n'),
					Terminal('r'),
					Terminal('t'),
					Terminal('v'),
					Sequence(
						Terminal('u'),
						Choice(0,
							NonTerminal('4 hexidecimal digits'),
							Sequence(Terminal('{'), NonTerminal('1-6 hexidecimal digits'), Terminal('}')))))))),
	Terminal('"'))