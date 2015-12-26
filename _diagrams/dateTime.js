Diagram(Stack(
	// date
	Sequence(
		// year
		Sequence(
			Choice(1, '+', Skip(), '-'),
			NonTerminal('4+ digit year')),
		Terminal('-'),
		// month
		NonTerminal('2 digit month'),
		Terminal('-'),
		// day
		NonTerminal('2 digit day')),
	// Time
	Optional(
		Sequence(
			Terminal('T'),
			NonTerminal('2 digit hour'),
			Terminal(':'),
			NonTerminal('2 digit minutes'),
			// seconds
			Optional(Sequence(
				Terminal(':'),
				NonTerminal('2 digit seconds'),
				Optional(Sequence(Terminal('.'), OneOrMore(NonTerminal('digit')))))))),
	// time zone offset
	Choice(1,
		Skip(),
		Terminal('Z'),
		Sequence(
			Choice(1, Terminal('+'), Skip(), Terminal('-')),
			NonTerminal('2 digit hour'),
			Optional(Sequence(Terminal(':'), NonTerminal('2 digit minutes')))))
))