import htm from "https://unpkg.com/htm?module";
import format from "https://unpkg.com/date-fns@2.7.0/esm/format/index.js?module";

const html = htm.bind(h);

// Preview component for a Post
const Post = createClass({
  render() {
    const entry = this.props.entry;

    return html`
      <main>
        <article>
          <h1>${entry.getIn(["data", "title"], null)}</h1>
          <p>
            <small>
              <time
                >${
                  format(
                    entry.getIn(["data", "date"], new Date()),
                    "dd MMM, yyyy"
                  )
                }</time
              >
              ${" by Author"}
            </small>
          </p>

          <p>${entry.getIn(["data", "summary"], "")}</p>

          ${this.props.widgetFor("body")}
          <p>
            ${
              entry.getIn(["data", "tags"], []).map(
                tag =>
                  html`
                    <a href="#" rel="tag">${tag}</a>
                  `
              )
            }
          </p>
        </article>
        <script src="https://unpkg.com/netlify-cms-yoast-seo@~1.0/dist/main.js"></script>
        <script src="https://unpkg.com/netlify-cms@~1.4/dist/cms.js"></script>
    
        <script type="text/javascript">
    
        CMS.registerPreviewStyle('https://unpkg.com/netlify-cms-yoast-seo@~1.0/dist/main.css');
        CMS.registerPreviewTemplate('page', createClass({
            render: function () {
                const entry = this.props.entry
                const title = entry.getIn(['data', 'title']) || ''
    
                YOAST.setContent({
                    title: title,
                    description: entry.getIn(['data', 'description']) || '',
                    keyword: entry.getIn(['data', 'yoast_keyword']) || '',
                    text: entry.getIn(['data', 'body']) || '',
                    titleWidth: title.split('').length * 5 // 5px is an average width of each character ;)
                })
    
                return h('div', {},
                    this.props.widgetFor('body'),
                    YOAST.getScoresAsHTML(h)
                );
            }
        }));
    
        </script>
      </main>
    `;
  }
});

export default Post;
