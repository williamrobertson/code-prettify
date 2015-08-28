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
        [
            // Whitespace
            [PR['PR_PLAIN'],  /^[\t\n\r \xA0]+/, null, '\t\n\r \xA0']
        ],
        // Fallback patterns - no special start character
        [
            // Character literal: single (not double) quoted, possibly multi-line, not escaped.
            // https://docs.oracle.com/database/121/SQLRF/sql_elements003.htm
            // Regex for q-quotes thanks to Chris Hunt
            // https://stackoverflow.com/questions/32255652/regex-to-match-quotes-like-qmikes-bike/32256546#32256546
            // https://regex101.com/r/lD2dY5/4
            // Moved to "fallback" section as needs to handle Unicode literals n'xyz' and q-quotes q'[xyz]'
            [PR['PR_STRING'], /^(?:q'\[.*?\](?=')'|q'<.*?>(?=')'|q'\(.*?\)(?=')'|q'{.*?}(?=')'|n?(?!q)'(?:[^']|'')*')/, null],
            // A comment is either a single-line comment starting with two dashes -- like so
            // or a single or multi-line block enclosed /* like so */
            [PR['PR_COMMENT'], /^(?:--[^\n\r]*|\/\*[\S\s]*?(?:\*\/|$))/],
            // All documented SQL and PL/SQL keywords as of 12c rel 1, 2015
            [PR['PR_KEYWORD'], /^(?:%isopen|%found|%notfound|%rowcount|add|all|alter|and|any|apply|as|asc|authid|authorization|begin|between|body|break|bulk\s+collect|by|cascade|case|check|checkpoint|close|collate|column|commit|compute|connect|constant|constraint|constructor|contains|context|continue|convert|create|cross|current|cursor|database|deallocate|declare|default|delete|deleting|deny|desc|deterministic|disk|distinct|distributed|drop|dummy|dump|else|elsif|end|errlvl|escape|exception_init|exceptions?|exec|execute\s+immediate|exists|exit|fetch|file|final|follows|for|foreign|from|full|function|goto|grant|group|having|if|in|index|inner|insert|inserting|instantiable|intersect|into|is|isolation\s+level|join|key|kill|left|like[24c]?|limit|load|local|loop|map|match|matched|member|merge|n|nocopy|nocycle|not|nulls\s+(first|last)|null|object|of|on|opaque|open|or\s+replace|or|order|out|outer|over|overriding|package|parallel_enable|partition|percent|pipe\s+row|pipelined|pivot|plan|pragma|precedes|primary|print|proc|procedure|public|q|raise|raise_application_error|raw|read|record|references|restrict|result|return|returning|revoke|right|rollback|row|rows|save|schema|select|self|session_user|set|set\s+transaction|setuser|shutdown|some|start|static|subtype|table|then|to|top|trigger|truncate|type|unbounded|under|union|unique|unpivot|update|updating|use|user|using|values|varray|view|when|where|while|with|within|write)(?=[^\w-]|$)/i, null ],
            // All documented SQL and PL/SQL functions as of 12c rel 1, 2015
            [PR['PR_FUNCTION'], /^(?:abs|acos|add_months|appendchildxml|approx_count_distinct|ascii|asciistr|asin|atan|atan2|avg|bfilename|bin_to_num|bitand|cardinality|cast|ceil|chartorowid|chr|cluster_details|cluster_distance|cluster_id|cluster_probability|cluster_set|coalesce|collect|compose|con_dbid_to_id|con_guid_to_id|con_name_to_id|con_uid_to_id|concat|convert|corr|cos|cosh|count|covar_pop|covar_samp|cume_dist|current_date|current_timestamp|dbtimezone|decode|decompose|deletexml|dense_rank|depth|dump|empty_blob|empty_clob|existsnode|exp|extract|extractvalue|feature_details|feature_id|feature_set|feature_value|first|first_value|floor|following|from_tz|greatest|group_id|grouping|grouping_id|hextoraw|initcap|insertchildxml|insertchildxmlafter|insertchildxmlbefore|insertxmlafter|insertxmlbefore|instr[bc24]?|json_query|json_table|json_value|lag|last|last_day|last_value|lead|least|length[bc24]?|listagg|ln|lnnvl|localtimestamp|log|lower|lpad|ltrim|max|median|min|mod|months_between|nanvl|nchr|new_time|next_day|nls_charset_decl_len|nls_charset_id|nls_charset_name|nls_initcap|nls_lower|nls_upper|nlssort|nth_value|ntile|nullif|numtodsinterval|numtoyminterval|nvl|nvl2|ora_dst_affected|ora_dst_convert|ora_dst_error|ora_hash|ora_invoking_user|ora_invoking_userid|path|percent_rank|percentile_cont|percentile_disc|power|powermultiset|powermultiset_by_cardinality|preceding|prediction|prediction_bounds|prediction_cost|prediction_details|prediction_probability|prediction_set|range|rank|ratio_to_report|rawtohex|rawtonhex|regexp_count|regexp_instr|regexp_replace|regexp_substr|remainder|replace|reverse|round|row_number|rowidtochar|rowidtonchar|rpad|rtrim|scn_to_timestamp|sessiontimezone|set|sign|sin|sinh|soundex|sqlcode|sqlerrm|sqrt|standard_hash|stats_binomial_test|stats_crosstab|stats_f_test|stats_ks_test|stats_mode|stats_mw_test|stats_one_way_anova|stats_wsr_test|stddev|stddev_pop|stddev_samp|substr[bc24]?|sum|sys_connect_by_path|sys_context|sys_dburigen|sys_extract_utc|sys_guid|sys_op_zone_id|sys_typeid|sys_xmlagg|sys_xmlgen|sysdate|systimestamp|tan|tanh|timestamp_to_scn|to_binary_double|to_binary_float|to_blob|to_char|to_clob|to_date|to_dsinterval|to_lob|to_multi_byte|to_nchar|to_nclob|to_number|to_single_byte|to_timestamp|to_timestamp_tz|to_yminterval|translate|treat|trim|trunc|tz_offset|uid|unistr|updatexml|upper|user|userenv|var_pop|var_samp|variance|vsize|width_bucket|xmlagg|xmlcast|xmlcdata|xmlcolattval|xmlcomment|xmlconcat|xmldiff|xmlelement|xmlexists|xmlforest|xmlisvalid|xmlparse|xmlpatch|xmlpi|xmlquery|xmlroot|xmlsequence|xmlserialize|xmltable|xmltransform)(?=[^\w-]|$)/i, null ],
            // SQL and PL/SQL data types, including "somecol%type", "sometable%rowtype".
            [PR['PR_TYPE'], /^(?:[_a-z][\w\$#\.]*\s?%(row)?type|bfile|binary_double|binary_float|binary_integer|blob|boolean|char|clob|cursor|date|day|double\s+precision|dsinterval_unconstrained|float|identity|integer|interval|long|month|natural|nchar|nclob|number|numeric|nvarchar2|pls_integer|ref cursor|second|simple_integer|time|time zone|timestamp|urowid|varchar2|varying array|xml|year)(?=[^\w-]|$)/i, null ],
            // A named exception
            [PR['PR_EXCEPTION'], /^(?:access_into_null|case_not_found|collection_is_null|cursor_already_open|dup_val_on_index|invalid_cursor|invalid_number|login_denied|no_data_found|no_data_needed|not_logged_on|others|program_error|rowtype_mismatch|self_is_null|storage_error|subscript_beyond_count|subscript_outside_limit|sys_invalid_rowid|timeout_on_resource|too_many_rows|value_error|zero_divide)(?=[^\w-]|$)/i, null ],
            // Host variables - :bind or &sqlplus_substitution
            [PR['PR_VARIABLE'], /^[:&][_a-z][\w-]*\.?/i],
            // A numeric literal (decimal, scientific notation) - also including PL/SQL symbols TRUE and FALSE
            // (No hex outside quoted expressions)
            [PR['PR_LITERAL'], /^([+-]?(?:0x[\da-f]+|(?:\.\d+|\d+(?:\.\d*)?)(?:e[+-]?\d+)?)|TRUE|FALSE)/i],
            // An identifier. In Oracle, this can be SOMETABLE, SOME$TABLE, SOME#TABLE or "Some Really Perverse Table!"
            // but not SOME-TABLE, 1SOMETABLE, $SOMETABLE etc
            [PR['PR_PLAIN'], /^(?:[_a-z][\w\$#]*|"[^"]*")/i],
            // Punctuation symbols
            [PR['PR_PUNCTUATION'], /^[^\w\t\n\r\ "'\xa0][^\w\t\n\r\ "'+\xa0-]*/]
        ]),
    ['plsql']);

