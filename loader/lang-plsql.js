var a=null;
PR.registerLangHandler(PR.createSimpleLexer([["pln",/^[\t\n\r \xa0]+/,a,"\t\n\r \u00a0"],["str",/^'[^']*'/,a,"'"],["var",/^&&?[\w#]+\.?/,a,"&"],["pun",/^[,;]/,a,";,"]],[["var",/^(:|\$\$)[a-z]\w+/i,a],["str",/^(?:q'\[.*?](?=')'|q'<.*?>(?=')'|q'\(.*?\)(?=')'|q'{.*?}(?=')'|n?(?!q)'(?:[^']|'')*')/,a],["com",/^(?:--[^\n\r]*|\/\*[\S\s]*?(?:\*\/|$))/],["kwd",/^(?:%isopen|%found|%notfound|%rowcount|access\s+parameters|add|administer|aggregate|all|alter|and|any|apply|as|asc|audit|authid|authorization|begin|between|body|break|bulk\s+collect|by|cache|cascade|case|check|checkpoint|close|cluster|collate|column|comment|commit|compress|compute|connect(_by_is(leaf|cycle))?|constraints?|constructor|contains|context|continue|create|cross|current|database|deallocate|declare|default|definer|delete|deleting|deny|desc|deterministic|dimension|disk|distinct|distributed|drop|dummy|editionable|else|elsif|empty|end|errlvl|escape|exception_init|exceptions?|exec|execute\s+immediate|exists|exit|explain\s+plan|external|fetch|fields\s+terminated|file|final|follows|for|foreign|from|full|function|goto|grant|group|hash(keys)?|having|identified|if|in|index|inner|insert|inserting|instantiable|intersect|into|is( +a +set)?|isolation\s+level|java|join|key|kill|left|like[24c]?|limit|list|load|local|location|lock|logging|loop|map|match|matched|measures|member|merge|minus|model|no(t|audit|cache|compress|copy|cycle|logging|neditionable|parallel)|nulls\s+(first|last)|null|object(_id|_value)?|of|on|opaque|open|operator|or\s+replace|or|ora_rowscn|order|organization|out(er)?|over(riding)?|package|parallel(_enable)?|partition|percent|pipe\s+row|pipelined|pivot|plan|policy|pragma|precedes|present|primary|print|prior|procedure|public|raise|raise_application_error|range|read|records|references|rename|restrict|result(_cache)?|return(ing)?|revoke|right|rollback|rows?|save(point)?|schema|select|self|sequen(ce|tial)|session|set|setuser|shutdown|single\s+table|size|some|sort|start|static|storage|subpartition|subtype|synonym|table(space)?|terminated|then|to|top|transaction|trigger|truncate|type|unbounded|under|union|unique|unpivot|updat(e|ing)|upsert|use|using|values|variable|versions_(xid|(start|end)(scn|time))|view|when|where|while|with|within|write)(?=[^\w-]|$)/i,a],
["fun",/^(?:abs|acos|add_months|appendchildxml|approx_count_distinct|ascii(str)?|asin|atan2?|avg|bfilename|bin_to_num|bitand|cardinality|cast|ceil|chartorowid|chr|cluster_(details|distance|id|probability|set)|coalesce|collect|compose|con_(dbid_to_id|guid_to_id|name_to_id|uid_to_id)|concat|convert|corr|cos|cosh|count|covar_(pop|samp)|cume_dist|current_(date|timestamp|user)|dbtimezone|deco(de|mpose)|deletexml|dense_rank|depth|dump|empty(_blob|_clob)|existsnode|exp|extract|extractvalue|feature_details|feature_id|feature_set|feature_value|first|first_value|floor|following|from_tz|greatest|group_id|grouping|grouping_id|hextoraw|initcap|insertchildxml(after|before)?|insertxml(after|before)|instr[24bc]?|json_(query|table|value)|keep|lag|last(_(day|value))?|lead|least|length[24bc]?|listagg|ln|lnnvl|localtimestamp|log|lower|lpad|ltrim|max|median|min|mod|months_between|n(an)?vl|nchr|new_time|next_day|nls_charset_decl_len|nls_charset_id|nls_charset_name|nls_initcap|nls_lower|nls_upper|nlssort|nth_value|ntile|nullif|numtodsinterval|numtoyminterval|nvl2?|ora_dst_(affected|convert|error)|ora_hash|ora_invoking_user(id)?|path|percent(_rank|ile_cont|ile_disc)?|power|powermultiset(_by_cardinality)?|preceding|prediction|prediction_(bounds|cost|details|probability|set)|range|rank|ratio_to_report|rawtohex|rawtonhex|regexp_(count|instr|replace|substr)|regr_(avgx|avgy|count|intercept|r2|slope|sxy|syy)|remainder|replace|reverse|round|row_number|rowidton?char|rpad|rtrim|rules|scn_to_timestamp|sessiontimezone|set|sign|sin|sinh|soundex|sqlcode|sqlerrm|sqrt|standard_hash|stats_(binomial_test|crosstab|f_test|ks_test|mode|mw_test|one_way_anova|wsr_test)|stddev(_pop|_samp)?|substr[24bc]?|sum|sys_con(nect_by_path|text)|sys_(dburigen|extract_utc|guid|op_zone_id|typeid|xmlagg|xmlgen)|sys(date|timestamp|tem)|tanh?|timestamp_to_scn|to_binary_(double|float)|to_(blob|char|clob|date|dsinterval|lob|multi_byte|nchar|nclob|number|single_byte|timestamp(_tz)?|yminterval)|translate|treat|trim|trunc|tz_offset|uid|unistr|updatexml|upper|user(env)?|var_(pop|samp)|variance|vsize|width_bucket|xml(agg|cast|cdata|colattval|comment|concat|diff|element|exists|forest|isvalid|parse|patch|pi|query|root|sequence|serialize|table|transform|user))(?=[^\w-]|$)/i,
a],["typ",/^(?:[_a-z][\w#$.]*\s?%(row)?type|bfile|binary_double|binary_float|binary_integer|blob|boolean|char|child|clob|constant|cursor|date|day|dec(imal)?|double\s+precision|dsinterval_unconstrained|float|hour|identity|integer|interval|long|minute|month|natural|nchar|nclob|number|numeric|nvarchar2|oracle_(loader|datapump)|pls_integer|raw|real|record|ref ?cursor|second|simple_integer|smallint|time|time zone|timestamp|urowid|varchar2?|varray|varying\s+array|xmltype|year)(?=[^\w-]|$)/i,a],["exc",
/^(?:access_into_null|case_not_found|collection_is_null|cursor_already_open|dup_val_on_index|invalid_cursor|invalid_number|login_denied|no_data_found|no_data_needed|not_logged_on|others|program_error|rowtype_mismatch|self_is_null|storage_error|subscript_beyond_count|subscript_outside_limit|sys_invalid_rowid|timeout_on_resource|too_many_rows|value_error|zero_divide)(?=[^\w-]|$)/i,a],["lit",/^([+-]?(?:\.\d+|\d+(?:\.\d*)?)(?:e[+-]?\d+)?|true|false)/i],["pln",/^(?:[_a-z][\w#$]*|"[^"]*")/i],
["pun",/^[^\w\t\n\r "'\xa0][^\w\t\n\r "'+\xa0-]*/]]),["plsql"]);
