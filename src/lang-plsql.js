// Copyright (C) 2008 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


/**
 * @fileoverview
 * Registers a language handler for PL/SQL.
 *
 *
 * To use, include prettify.js and this file in your HTML page.
 * Then put your code in an HTML tag like
 *      <pre class="prettyprint lang-plsql">(my PL/SQL code)</pre>
 *
 *
 * @author: william@williamrobertson.net 2015
 * Adapted from lang-sql.js by mikesamuel@gmail.com
 *
 * lang-sql.js originally used http://savage.net.au/SQL/sql-99.bnf.html as basis
 * for SQL syntax, but I replaced keyword and function lists using
 * https://docs.oracle.com/database/121/SQLRF/toc.htm (SQL)
 * https://docs.oracle.com/database/121/LNPLS/toc.htm (PL/SQL)
 * (these may not be exhaustive as some specialised terms are documented separately).
 * Some of the listed terms are themselves regexes e.g.
 * bulk\s+collect - to restrict keyword highlighting to "bulk collect" syntax
 *                  ("collect" on its own is a SQL function)
 * instr[bc24]?   - to include all the Unicode variants in one regexp.
 */
PR['registerLangHandler'](
    PR['createSimpleLexer'](
        // Patterns that always start with a known character
        [ [PR['PR_PLAIN'],  /^[\t\n\r \xA0]+/, null, '\t\n\r \xA0']  // Whitespace
        , [PR['PR_STRING'], /^'[^']*'/, null, "'"]  // Character literal, potentially multi-line
        , [PR['PR_VARIABLE'], /^&&?[a-z_0-9#]+\.?/i, null, '&']  // SQL*Plus substitution &variable
        , [PR['PR_PUNCTUATION'], /^[;,]/, null, ';,']
        ]
        // Fallback patterns - no special start character
      , [ // :bind variable
          [PR['PR_VARIABLE'], /^(:|\$\$)[a-z]\w+/i, null] 
          // Character literal: single-quoted, possibly multi-line, not escaped.
          // https://docs.oracle.com/database/121/SQLRF/sql_elements003.htm
          // Regex for q-quotes thanks to Chris Hunt
          // https://stackoverflow.com/questions/32255652/regex-to-match-quotes-like-qmikes-bike/32256546#32256546
          // https://regex101.com/r/lD2dY5/4
        , [PR['PR_STRING'], /^(?:q'\[.*?\](?=')'|q'<.*?>(?=')'|q'\(.*?\)(?=')'|q'{.*?}(?=')'|n?(?!q)'(?:[^']|'')*')/, null]
          // A comment - either a single-line comment starting with two dashes -- like so
          // or a single or multi-line block enclosed /* like so */
        , [PR['PR_COMMENT'], /^(?:--[^\n\r]*|\/\*[\S\s]*?(?:\*\/|$))/]
          // All SQL and PL/SQL keywords as of 12c rel 1, 2015
        , [PR['PR_KEYWORD'], /^(?:%isopen|%found|%notfound|%rowcount|access\s+parameters|add|administer|aggregate|all|alter|and|any|apply|as|asc|audit|authid|authorization|begin|between|body|break|bulk\s+collect|by|cache|cascade|case|check|checkpoint|close|cluster|collate|column|comment|commit|compress|compute|connect(_by_is(leaf|cycle))?|constraints?|constructor|contains|context|continue|create|cross|current|database|deallocate|declare|default|definer|delete|deleting|deny|desc|deterministic|dimension|disk|distinct|distributed|drop|dummy|editionable|else|elsif|empty|end|errlvl|escape|exception_init|exceptions?|exec|execute\s+immediate|exists|exit|explain\s+plan|external|fetch|fields\s+terminated|file|final|follows|for|foreign|from|full|function|goto|grant|group|hash(keys)?|having|identified|if|in|index|inner|insert|inserting|instantiable|intersect|into|is( +a +set)?|isolation\s+level|java|join|key|kill|left|like[24c]?|limit|list|load|local|location|lock|logging|loop|map|match|matched|measures|member|merge|minus|model|no(t|audit|cache|compress|copy|cycle|logging|neditionable|parallel)|nulls\s+(first|last)|null|object(_id|_value)?|of|on|opaque|open|operator|or\s+replace|or|ora_rowscn|order|organization|out(er)?|over(riding)?|package|parallel(_enable)?|partition|percent|pipe\s+row|pipelined|pivot|plan|pluggable|policy|polymorphic|pragma|precedes|present|primary|print|prior|procedure|public|raise|raise_application_error|range|read|records|references|rename|restrict|result(_cache)?|return(ing)?|revoke|right|rollback|rows?|save(point)?|schema|select|self|sequen(ce|tial)|session|set|setuser|shutdown|single\s+table|size|some|sort|sql_macro|start|static|storage|subpartition|subtype|synonym|table(space)?|terminated|then|to|top|transaction|trigger|truncate|type|unbounded|under|union|unique|unpivot|updat(e|ing)|upsert|use|using|values|variable|versions_(xid|(start|end)(scn|time))|view|when|where|while|with|within|write)(?=[^\w-]|$)/i, null ]
          // All SQL and PL/SQL functions as of 12c rel 1, 2015
        , [PR['PR_FUNCTION'], /^(?:abs|acos|add_months|appendchildxml|approx_count_distinct|ascii(str)?|asin|atan2?|avg|bfilename|bin_to_num|bitand|cardinality|cast|ceil|chartorowid|chr|cluster_(details|distance|id|probability|set)|coalesce|collect|compose|con_(dbid_to_id|guid_to_id|name_to_id|uid_to_id)|concat|convert|corr|cos|cosh|count|covar_(pop|samp)|cume_dist|current_(date|timestamp|user)|dbtimezone|deco(de|mpose)|deletexml|dense_rank|depth|dump|empty(_blob|_clob)|existsnode|exp|extract|extractvalue|feature_details|feature_id|feature_set|feature_value|first|first_value|floor|following|from_tz|greatest|group_id|grouping(\s+sets|_id)|hextoraw|initcap|insertchildxml(after|before)?|insertxml(after|before)|instr[bc24]?|json_(query|table|value)|keep|lag|last(_(day|value))?|lead|least|length[bc24]?|listagg|ln|lnnvl|localtimestamp|log|lower|lpad|ltrim|max|median|min|mod|months_between|n(an)?vl|nchr|new_time|next_day|nls_charset_decl_len|nls_charset_id|nls_charset_name|nls_initcap|nls_lower|nls_upper|nlssort|nth_value|ntile|nullif|numtodsinterval|numtoyminterval|nvl2?|ora_dst_(affected|convert|error)|ora_hash|ora_invoking_user(id)?|path|percent(_rank|ile_cont|ile_disc)?|power|powermultiset(_by_cardinality)?|preceding|prediction|prediction_(bounds|cost|details|probability|set)|range|rank|ratio_to_report|rawtohex|rawtonhex|regexp_(count|instr|replace|substr)|regr_(avgx|avgy|count|intercept|r2|slope|sxy|syy)|remainder|replace|reverse|round|row_number|rowidton?char|rpad|rtrim|rules|scn_to_timestamp|sessiontimezone|set|sign|sin|sinh|soundex|sqlcode|sqlerrm|sqrt|standard_hash|stats_(binomial_test|crosstab|f_test|ks_test|mode|mw_test|one_way_anova|wsr_test)|stddev(_pop|_samp)?|substr[bc24]?|sum|sys_con(nect_by_path|text)|sys_(dburigen|extract_utc|guid|op_zone_id|typeid|xmlagg|xmlgen)|sys(date|timestamp|tem)|tanh?|timestamp_to_scn|to_binary_(double|float)|to_(blob|char|clob|date|dsinterval|lob|multi_byte|nchar|nclob|number|single_byte|timestamp(_tz)?|yminterval)|translate|treat|trim|trunc|tz_offset|uid|unistr|updatexml|upper|user(env)?|var_(pop|samp)|variance|vsize|width_bucket|xml(agg|cast|cdata|colattval|comment|concat|diff|element|exists|forest|isvalid|parse|patch|pi|query|root|sequence|serialize|table|transform|user))(?=[^\w-]|$)/i, null ]
          // SQL and PL/SQL data types, including "somecol%type", "sometable%rowtype".
        , [PR['PR_TYPE'], /^(?:[_a-z][\w\$#\.]*\s?%(row)?type|bfile|binary_double|binary_float|binary_integer|blob|boolean|char|child|clob|constant|cursor|date|day|dec(imal)?|double\s+precision|dsinterval_unconstrained|float|hour|identity|integer|interval|long|minute|month|natural|nchar|nclob|number|numeric|nvarchar2|oracle_(loader|datapump)|pls_integer|raw|real|record|ref ?cursor|second|simple_integer|smallint|time|time zone|timestamp|urowid|varchar2?|varray|varying\s+array|xmltype|year)(?=[^\w-]|$)/i, null ]
          // Named exception
        , [PR['PR_EXCEPTION'], /^(?:access_into_null|case_not_found|collection_is_null|cursor_already_open|dup_val_on_index|invalid_cursor|invalid_number|login_denied|no_data_found|no_data_needed|not_logged_on|others|program_error|rowtype_mismatch|self_is_null|storage_error|subscript_beyond_count|subscript_outside_limit|sys_invalid_rowid|timeout_on_resource|too_many_rows|value_error|zero_divide)(?=[^\w-]|$)/i, null ]
          // A numeric literal (decimal, scientific notation) - also Boolean literals TRUE, FALSE
        , [PR['PR_LITERAL'], /^([+-]?(?:(?:\.\d+|\d+(?:\.\d*)?)(?:e[+-]?\d+)?)|TRUE|FALSE)/i]
          // Identifier: SOMETABLE, SOME$TABLE, SOME#TABLE or "Some Really Perverse Table!"
          // but not SOME-TABLE, 1SOMETABLE or $SOMETABLE.
        , [PR['PR_PLAIN'], /^(?:[_a-z][\w\$#]*|"[^"]*")/i]
          // Any other non-word, non-whitespace characters
        , [PR['PR_PUNCTUATION'], /^[^\w\t\n\r\ "'\xa0][^\w\t\n\r\ "'+\xa0-]*/]
        ]),
    ['plsql']);

