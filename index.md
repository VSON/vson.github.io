---
layout: page
title: Introducing VSON
---
**VSON** (Very Simple Object Notation) is a lightweight data-interchange format. It is a successor and superset of the popular JSON (JavaScript Object Notation) format.  VSON improves on human readability and writablity, date and time support, Unicode handling and data portability.

The popularity of JSON is due to its simplicity and that it can implemented in JavaScript with `eval`.  It's important not to lose that simplicity.  However, it is now widely recognized that using `eval` to parse JSON is a security risk and it is a best practise to use a true parser (most browsers now have built-in JSON parsing support).  Thus there is no reason we shouldn't evolve JSON to VSON.  The widespread use of JSON as a configuration file format has exposed its deficiencies in a few areas.  VSON improves on JSON by adding comments, date/times, Unicode escapes and special number values.

### Comments
Comments are critical to the creation of self documenting configuration files. VSON supports JavaScript/C style block and line comments.  Block comments begin with '`/*`'  and are terminated by the next '`*/`'.  Line comments begin with '`//`' and are terminated by the end of line.  Comments can appear anywhere white space can and are treated as white space.

### Date/Times
VSON's date/time values addresses a long standing issue with JSON.  In the absence of any specification in JSON a [number of competing approaches have developed](http://markembling.info/2011/07/json-date-time).  Though it appears using ISO 8601 string values has become the consensus, that causes issues when those are also valid string values and when it isn't clear from the structure of the document which values ought to be dates.  Even when it is clear, it creates additional work for developers.

VSON supports both date and date/time literal values following [ES6](http://www.ecma-international.org/ecma-262/6.0/)'s restricted form of the [ISO date/time format](https://en.wikipedia.org/wiki/ISO_8601).  Dates are written beginning with a 4+ digit year, then 2 digit month and 2 digit day separated with dashes like '`2015-12-23`'.  In languages with separate date data types this form is the  recommended representation for dates independent of any time zone.  Date/times are a date appended with a time separated by a '`T`', for example '`2015-12-23T12:45:44.145Z`'.  The time may be shortened by omitting the milliseconds and seconds.  The time zone offset is either '`Z`' for UTC or '`+`' or '`-`' followed by a time offset of the form '`05:30`' (minutes may be omitted).  If the time zone offset is absent, the date/time is interpreted as an unspecified time zone if the language supports it or otherwise  local time.

### Unicode Escapes

VSON extends JSON's string literals to better support Unicode and be more in line with [ES6 string literals](http://www.ecma-international.org/ecma-262/6.0/#sec-literals-string-literals).  VSON supports extended Unicode escape sequences of the form '`\u{`*HexDigits*`}`' where hex digits is 1 to 6 hexadecimal digits whose value is less than or equal to 0x10FFFF.  VSON also adds support for the vertical tab escape sequence '`\v`'.

### Data Portability

VSON additionally addresses the issue that [JSON string literals are not a proper subset of JavaScript strings](https://en.wikipedia.org/wiki/JSON#Data_portability_issues).  JSON allowing Unicode line terminators in strings is a source of issues and confusion.   Since VSON is a true superset of JSON, all JSON strings are valid VSON strings.  However, VSON specifies that conforming VSON generators must escape all Unicode line terminators.

Finally, VSON adds support for the three special number values '`NaN`', '`Infinity`' and '`-Infinity`' so that all IEEE 754 floating point values can be round tripped.

---

## When to use VSON

VSON is great whenever you would use JSON as a lightweight messaging protocol.  However, VSON really shines for configuration files and when date and time handling is an issue.

---
<div class="grammar" markdown="1">
## Grammar

value
:	string
:	number
:	date-time
:	object
:	array
:	`true`
:	`false`
:	`null`

object
:	`{}`
:	`{` members `}`

members
:	pair
:	pair `,` members

pair
:	string `:` value

array
:	`[]`
:	`[` elements `]`

elements
:	value
:	value `,` elements

---

string
:	`""`
:	`"` chars `"`

chars
:	char
:	char chars

char
:	string-character
:	`\"`
:	`\\`
:	`\/`
:	`\b`
:	`\f`
:	`\n`
:	`\r`
:	`\t`
:	`\v`
:	`\u` four-hex-digits
:	`\u{` one-to-six-hex-digits `}`

number
:	int
:	int frac
:	int exp
:	int frac exp
:	`Infinity`
:	`-Infinity`
:	`NaN`

int
:	digit
:	digit1-9 digits
:	`-` digit
:	`-` digit1-9 digits

frac
:	`. `digits

exp
:	e digits

digits
:	digit
:	digit digits

e
:	`e`
:	`e+`
:	`e-`
:	`E`
:	`E+`
:	`E-`

date-time
:	date
:	date time
:	date offset
:	date time offset

date
:	year `-` month `-` day

year
:	digit digit digit digits
:	`+` digit digit digit digits
:	`-` digit digit digit digits

month
:	digit digit

day
:	digit digit

time
:	`T` hours mins
:	`T` hours mins secs
:	`T` hours mins secs frac

hours
:	digit digit

mins
:	`:` digit digit

secs
:	`:` digit digit

offset
:	`Z`
:	`+` hours
:	`-` hours
:	`+` hours mins
:	`-`	hours mins

---

block-comment
:	`/*` segments `/`

segments
:	segment
:	segment segments

segment
:	stars
:	segment-chars stars

segment-chars
:	segment-char
:	segment-char segment-chars

segment-char
:	any-character-  
	    except-asterisk

stars
:	`*`
:	`*` stars

line-comment
:	`//` eol
:	`//` comment-chars eol

comment-chars
:	comment-char
:	comment-char comment-chars

comment-char
:	any-character-except-  
	    new-line-  
	    or-carriage-return

eol
:	new-line
:	carriage-return
:	eof
</div>

## Specification


A VSON document or message is encoded in one of the Unicode encodings UTF-8, UTF-16, or UTF-32.  UTF-8 is the preferred encoding.  VSON generators shall not emit byte order marks for UTF-8.  In some circumstances it may be necessary to send VSON through an ASCII transmission channel.  This is acceptable upon agreement of both parties, but the sender must be careful to escape all Unicode characters above U+007F in strings and avoid the usage of such characters in comments.

A VSON document or message is a single VSON value or no value (i.e. empty except for white space and comments).  White space and comments may occur between tokens and is not significant.  The proper MIME type for VSON is '`application/vson`'.

### Values

A *value* can be a string in double quotes, or a number, or a date/time, or true or false or null, or an object or an array. These structures can be nested.

![value syntax diagram](/diagrams/value.png)

### Objects

An *object* is an unordered set of name/value pairs. An object begins with '`{`' (left brace) and ends with '`}`' (right brace). Each name is followed by '`:`' (colon) and the name/value pairs are separated by '`,`' (comma).

![object syntax diagram](/diagrams/object.png)

### Arrays

An *array* is an ordered collection of values. An array begins with '`[`' (left bracket) and ends with '`]`' (right bracket). Values are separated by '`,`' (comma).

![array syntax diagram](/diagrams/array.png)

### Strings

A *string* is a sequence of zero or more Unicode characters, wrapped in double quotes, using backslash escapes. A character is represented as a single character string. A string is very much like a C or Java string.

![string syntax diagram](/diagrams/string.png)

A string character is any character except '`"`' (double quote), '`\`' (backslash), or control characters (U+0000 through U+001F).  For JSON compatibility, strings can contain the Unicode line terminators U+0085 (next line), U+2028 (line separator) and U+2029 (paragraph separator), however a conforming VSON generator must escape those characters.  Furthermore, VSON generators must escape all characters in the Unicode categories Cc (Other, Control) and Cn (Other, Not Assigned).

A hexadecimal digit is any of U+0030 (0) through U+0039 (9), U+0041 (A) through (F) U+0046 or U+0061 (a) through U+0066 (f).

Unicode characters outside the basic multilingual plane can be escaped either as a single extended Unicode escape sequence or, for JSON compatibility, as a UTF-16 surrogate pair.  For example, U+1D11E (G clef) can be escaped either as '`\u{1D11E}`' or by '`\uD834\uDD1E`'.  However, extended escape sequences cannot be used to escape surrogate pairs so '`\u{D834}\u{DD1E}`' would be illegal.  Unpaired or out of order surrogate pairs are invalid UTF-16 and their handling in VSON is undefined.

### Numbers

A *number* is very much like a C or Java number, except that the octal and hexadecimal formats are not used.

![number syntax diagram](/diagrams/number.png)

A digit is any of U+0030 (0) through U+0039 (9). When converting from and to data types that support signed zero, the sign should be preserved.

### Date/times

A *date/time* is a date with optional time and optional time zone offset represented in a restricted form of ISO 8601 date format. This format matches closely the format specified in ES6.  The year must always be at least four digits.  Leading zeros are allowed, but do not change the date represented.  Year 0 is equal to 1 BCE and is considered positive.  A negative sign is not allowed for the year zero.  The month must be a value between '`01`' and '`12`' inclusive.  The days must be a value between '`01`' and '`31`' and must form a valid date for the given year and month.  Hours must be a value between '`00`' and '`24`' inclusive.  Minutes and seconds must be a value between '`00`' and '`59`' inclusive. Omitted values are the same as zeros.  The time must be between the values of '`00:00`' and '`24:00`' inclusive.  Note that both '`00:00`' and `'24:00`' represent midnight.  By convention '`24:00`' signifies midnight at the end of the day whereas '`00:00`' signifies midnight at the beginning of the day.  However, for consecutive days, they represent the same instant.  UTC dates and times are signified by '`Z`'.  Other time zones are specified as offsets.  Dates and times without a time zone offset should be interpreted in local time or as an unspecified time zone when the representation supports it.

![number syntax diagram](/diagrams/dateTime.png)

### White space

VSON white space consists of any of the following characters U+0009 (horizontal tab), U+000A (new line), U+000D (carriage return) and U+0020 (space).  Comments are also treated as white space.  White space is not significant and may occur between any tokens.

### Block Comments

A *block comment* begins with '`/*`'  and is terminated by the next '`*/`'.

![number syntax diagram](/diagrams/blockComment.png)

### Line Comments

A *line comment* begins with '`//`' and is terminated by the end of line (or file).

![number syntax diagram](/diagrams/lineComment.png)

---

## Implementations

  * C#
    * *Coming Soon...*
  * JavaScript
    * *Coming Soon...*