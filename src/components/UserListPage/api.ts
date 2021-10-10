import { addTokenIfExists } from '../../store/actions/commonUserActions'

const searchUsersBaseUrl = "https://api.github.com/search/users?";

const usersApi =
  async (query: any, sort: any) => {
    const settings: any = {
      method: "GET",
      headers: {
        Authorization: addTokenIfExists(),
      },
    };
    try {
      const data = await (
        await fetch(
          searchUsersBaseUrl +
            new URLSearchParams({
              q: query,
              sort: sort,
              type: "Users",
              per_page: "10",
              page: "1",
            }).toString(),
          settings
        )
      ).json();
      if (data.items) {
        const users = data.items;
        return users
      } else {
        return []
      }
    } catch (error) {
      throw new Error("Could not find users");
    }
  };

export default usersApi