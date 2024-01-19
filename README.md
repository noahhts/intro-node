CLI note-taking app with a simple website from the [Introduction to Node.js, v3](https://frontendmasters.com/courses/node-js-v3/) course on Frontend Masters.

You can see the course notes/slides [on Notion](https://scottmoss.notion.site/scottmoss/Intro-to-Node-js-V3-7c8e4ccaebf94b839f425fff13dcc44c) and the code [on GitHub](https://github.com/Hendrixer/intro-node-v3).

I've added to the original app in the following ways:

- added a tag command (for the CLI) to filter notes by tag
- used Tailwind CSS to add styling and edited the HTML template
- added a script tag and wrote some frontend/client-side JavaScript to filter the display of notes by tags

When building stuff from scratch, it definitely helps you understand why frameworks exist.

Next steps: learning more about fullstack to somehow connect or have access to the database and server logic on the frontend, both to improve the current code and structure as well as adding the CLI commands to the web app.

Add your own db.json file in the root directory as your personal database:

```json
{
  "notes": []
}
```
