# Contributing to Plushies.dev

First off, thanks for taking the time to contribute! ❤️

All types of contributions are encouraged and valued. See the [Table of Contents](#table-of-contents) for different ways to help and details about how this project handles them. Please make sure to read the relevant section before making your contribution. It will make it a lot easier for us maintainers and smooth out the experience for all involved. The community looks forward to your contributions.

> And if you like the project, but just don't have time to contribute, that's fine. There are other easy ways to support the project and show your appreciation, which we would also be very happy about:
> - Star the project
> - Tweet about it
> - Refer this project in your project's readme
> - Mention the project at local meetups and tell your friends/colleagues

## Table of Contents

- [Contributing to Plushies.dev](#contributing-to-plushiesdev)
  - [Table of Contents](#table-of-contents)
  - [I Have a Question](#i-have-a-question)
  - [I Want To Contribute](#i-want-to-contribute)
    - [Reporting Bugs](#reporting-bugs)
    - [Suggesting Enhancements](#suggesting-enhancements)
    - [Your First Code Contribution](#your-first-code-contribution)
  - [Adding a New Plushie](#adding-a-new-plushie)

## I Have a Question

If you want to ask a question, we assume that you have read the available [Documentation](README.md).

Before you ask a question, it is best to search for existing [Issues](https://github.com/yoanbernabeu/plushies.dev/issues) that might help you. In case you've found a suitable issue and still need clarification, you can write your question in this issue. It is also advisable to search the internet for answers first.

## I Want To Contribute

### Reporting Bugs

A good bug report shouldn't leave others needing to chase you up for more information. Therefore, we ask you to investigate carefully, collect information and describe the issue in detail in your report.

### Suggesting Enhancements

This section guides you through submitting an enhancement suggestion for Plushies.dev, **including completely new features and minor improvements to existing functionality**. Following these guidelines will help maintainers and the community to understand your suggestion and find related suggestions.

### Your First Code Contribution

1.  Fork the repository.
2.  Clone your fork locally: `git clone https://github.com/YOUR_USERNAME/plushies.dev.git`
3.  Create a new branch: `git checkout -b my-fix`
4.  Make your changes.
5.  Commit your changes: `git commit -m "fix: descriptive message"`
6.  Push to your fork: `git push origin my-fix`
7.  Submit a Pull Request.

## Adding a New Plushie

We love seeing new plushies added to the database! Here is how to do it properly:

1.  **Image Requirements**:
    *   Format: **PNG**
    *   Quality: High resolution, well-lit
    *   Filename: `tech-name-plushie-name.png` (e.g., `rust-ferris.png`) - **MUST MATCH MD FILENAME**
    *   Location: `src/assets/`

2.  **Content File**:
    *   Create a new markdown file in `src/content/plushies/`.
    *   Filename: `tech-name-plushie-name.md` (e.g., `rust-ferris.md`) - **MUST MATCH PNG FILENAME**
    *   Format:

```markdown
---
name: "Plushie Name"
techs: ["Tech1", "Tech2"]
official_link: "https://link-to-buy.com"
---

Description of the plushie. A little story or fun fact.
```

3.  **Verification**:
    *   Run `npm run dev` locally to ensure the card displays correctly on the homepage.
    *   Check the "Tech" page corresponding to the tags you added.

Thank you for contributing!

