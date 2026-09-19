const USERNAME = import.meta.env.VITE_GITHUB_USERNAME || 'codedwithjaydip';

/**
 * Reads the public GitHub API from the browser — unauthenticated, so no token
 * is ever shipped to the client. Rate limits are expected; callers fall back
 * to a plain profile link when this rejects.
 */
export async function fetchGithubProfile() {
  const [profileRes, reposRes] = await Promise.all([
    fetch(`https://api.github.com/users/${USERNAME}`),
    fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`),
  ]);

  if (!profileRes.ok || !reposRes.ok) {
    throw new Error(profileRes.status === 403 ? 'rate-limited' : 'unavailable');
  }

  const profile = await profileRes.json();
  const repos = await reposRes.json();

  const languageCounts = repos.reduce((acc, repo) => {
    if (repo.language) acc[repo.language] = (acc[repo.language] || 0) + 1;
    return acc;
  }, {});

  const languages = Object.entries(languageCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([name, count]) => ({ name, count, share: count / repos.length }));

  const topRepos = repos
    .filter((repo) => !repo.fork)
    .sort((a, b) => b.stargazers_count - a.stargazers_count || new Date(b.pushed_at) - new Date(a.pushed_at))
    .slice(0, 4)
    .map((repo) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      language: repo.language,
      stars: repo.stargazers_count,
      url: repo.html_url,
      pushedAt: repo.pushed_at,
    }));

  return {
    username: USERNAME,
    url: profile.html_url,
    avatar: profile.avatar_url,
    publicRepos: profile.public_repos,
    followers: profile.followers,
    languages,
    topRepos,
  };
}

export const githubProfileUrl = `https://github.com/${USERNAME}`;
