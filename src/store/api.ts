import { addTokenIfExists } from './actions/commonUserActions'

// Fetch 3 single user repos.
export const userReposApi = async (user: string) => {
  let settings: any = {
    method: "GET",
    headers: {
      Authorization: addTokenIfExists(),
    },
  };
  try {
    const data = await (
      await fetch(
        `https://api.github.com/users/${user}/repos?per_page=3&page=1`,
        settings
      )
    ).json();
    if (data.message !== "Not Found") {
      return {
        user: user,
        repos: data
      }
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.log(error)
  }
};