ComplexDiagram(
	Terminal('['),
	ZeroOrMore(
		NonTerminal('value'),
		','),
	Terminal(']'))