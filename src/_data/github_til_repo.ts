export type TIL = {
  content: string;
  date: string;
  path: string;
  title: string;
};

export const getGitHubTilRepo = async () => {
  const response = await fetch(
    'https://raw.githubusercontent.com/petermekhaeil/til/master/feed.json'
  );

  const body = await response.text();

  let til;

  try {
    til = JSON.parse(body) as TIL[];
    til = til.map((item) => ({
      ...item,
      path: item.path.substring(0, item.path.lastIndexOf('.'))
    }));
  } catch (e) {
    throw Error('Unable to parse TIL Feed', { cause: e });
  }

  return til;
};
