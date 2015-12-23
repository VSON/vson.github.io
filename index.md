---
layout: page
title: Introducing VSON
---
**VSON** (Very Simple Object Notation) is a lightweight data-interchange format. It is a successor and superset of the popular JSON (JavaScript Object Notation) format.  VSON improves on human readability and writablity, date and time support and Unicode handling.

The popularity of JSON is due to its simplicity and that initially it could be implemented in JavaScript with `eval`.  It's important not to lose that simplicity.  However, it is now widely recognized that using `eval` to parse JSON is a security risk and it is a best practise to use a true parsing library or the browser's new built in JSON support.  Thus there is no reason we shouldn't evolve JSON to VSON.  The widespread use of JSON as a configuration file format has exposed its deficiencies in a few areas.  VSON improves on JSON by adding:

### Comments
VSON supports JavaScript/C style block and line comments.  Block comments begin with `/*`  and are terminated by the next `*/`.  Line comments begin with `//` and are terminated by the end of line.  Comments can appear anywhere white space can and are treated as white space.  Comments are critical to the creation of self documenting configuration files.

### Date/Times
VSON supports both date and date/time literal values following [ES6](http://www.ecma-international.org/ecma-262/6.0/)'s restricted form of the [ISO date/time format](https://en.wikipedia.org/wiki/ISO_8601).  Dates are written beginning with a 4+ digit year, then month and day separated with dashes like `2015-12-23`.  In languages with separate date data types this form is the  recommended representation for dates independent of any time zone.  Date/times are a date appended with a time separated by a 'T', for example `2015-12-23T12:45:44.145Z`.  The time may be shortened by omitting the milliseconds and seconds.  The time zone offset is either 'Z' for UTC or '+' or '-' followed by a time offset of the form '05:30' (minutes may be omitted).  If the time zone offset is absent, the date/time is interpreted as local time.

VSON's support of date/time values addresses a long standing issue with JSON.  In the absence of any specification in JSON a [number of competing approaches have developed](http://markembling.info/2011/07/json-date-time).  While it appears using ISO 8601 string values has become the consensus, that leaves real issues when those are also valid string values and when it isn't clear from the structure of the document which values ought to be dates.  Even when it is clear, it creates additional work for developers.

### Unicode and Improved Strings

VSON extends JSON's string literals to better support Unicode and be more in line with [ES6 string literals](http://www.ecma-international.org/ecma-262/6.0/#sec-literals-string-literals).  VSON supports extended Unicode escape sequences of the form '\u{*HexDigits*}' where hex digits is 1 to 6 hexadecimal digits whose value is less than or equal to 0x10FFFF.  VSON also adds support for the vertical tab escape sequence '\v'.

VSON additionally addresses the issue that [JSON string literals are not a proper subset of JavaScript strings](https://en.wikipedia.org/wiki/JSON#Data_portability_issues).  JSON allowing Unicode line terminators in strings is a source of issues and confusion.   Since VSON is a true superset of JSON, all JSON strings are valid VSON strings.  However, VSON specifies that conforming VSON generators must escape all Unicode line terminators.

---

## Specification

---

## Implementations

  * Javascript
    * *Coming Soon...*
  * C#
    * *Coming Soon...*