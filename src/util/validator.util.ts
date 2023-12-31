export const hasSql = (value: string) => {
  if (!value) {
    return false;
  }

  const sql_meta = new RegExp("(%27)|(')|(--)", 'i');

  if (sql_meta.test(value)) {
    return true;
  }

  const sql_meta2 = new RegExp(
    "((%3D)|(=))[^\n]*((%27)|(')|(--)|(%3B)|(;))",
    'i',
  );
  if (sql_meta2.test(value)) {
    return true;
  }

  const sql_typical = new RegExp(
    "w*((%27)|('))((%6F)|o|(%4F))((%72)|r|(%52))",
    'i',
  );
  if (sql_typical.test(value)) {
    return true;
  }

  const sql_union = new RegExp("((%27)|('))union", 'i');

  if (sql_union.test(value)) {
    return true;
  }

  return false;
};

export const hasScript = (value: string) => {
  return /<script[\s\S]*?>[\s\S]*?<\/script>/gi.test(value);
};

export const isValidEmailAddress = (emailAddress: string) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(emailAddress);
};

export const isValidGuid = (guid: string): boolean => {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    guid,
  );
};
