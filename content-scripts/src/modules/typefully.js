// Function to add "Continue Thread in Typefully"
export const addTypefullyPlug = () => {
  const modal = document.querySelector(
    '[aria-labelledby="modal-header"][role="dialog"]'
  );
  const tweetComposeArea = modal?.querySelector(
    "div.public-DraftStyleDefault-block"
  );
  const tweet2Exist = document.querySelector(`[data-testid="tweetTextarea_1"]`);

  if (
    modal &&
    tweet2Exist &&
    tweetComposeArea &&
    !document.getElementById("typefully-link")
  ) {
    const typefullyLinkElement = createTypefullyLinkElement(
      "typefully-link",
      "typefully-modal-button"
    );
    typefullyLinkElement.addEventListener("click", () => {
      getCurrentTextAndSendToTypefully();
    });

    const typefullyLogo = createTypefullyLogo();
    const typefullyText = document.createElement("span");
    typefullyText.innerText = "Save draft to Typefully";

    typefullyLinkElement.appendChild(typefullyLogo);
    typefullyLinkElement.appendChild(typefullyText);

    modal.appendChild(typefullyLinkElement);
  }
};

// Function to save current reply
export const saveCurrentReplyToLink = () => {
  function logLink(ev) {
    const linkElement = ev.target;
    const tweet = linkElement.closest('[data-testid="tweet"]');
    const tweetLinks = tweet.querySelectorAll("a[role='link']");
    const tweetLink = Array.from(tweetLinks).find((link) =>
      link.href.includes("/status/")
    ).href;
    sessionStorage.setItem("typefully-replying-to", tweetLink);
  }

  document.querySelectorAll('[data-testid="reply"]').forEach((replyButton) => {
    replyButton.removeEventListener("click", logLink);
    replyButton.addEventListener("click", logLink);
  });
};

// Function to add "Reply with Typefully"
export const addTypefullyReplyPlug = () => {
  const modal = document.querySelector(
    '[aria-labelledby="modal-header"][role="dialog"]'
  );
  const toolbar = modal && modal.querySelector('[data-testid="toolBar"]');
  const replyButton =
    modal && modal.querySelector('[data-testid="tweetButton"]');

  const tweetComposeArea = modal?.querySelector(
    "div.public-DraftStyleDefault-block"
  );

  const replyingToLink = sessionStorage.getItem("typefully-replying-to");

  if (
    modal &&
    toolbar &&
    replyButton &&
    replyingToLink &&
    // tweet2Exist &&
    tweetComposeArea &&
    !document.getElementById("typefully-reply-link")
  ) {
    sessionStorage.removeItem("typefully-replying-to");

    const typefullyReplyLinkElement = createTypefullyLinkElement(
      "typefully-reply-link",
      "typefully-reply-button"
    );
    typefullyReplyLinkElement.addEventListener("click", () => {
      getCurrentTextAndSendToTypefully(replyingToLink);
    });

    const typefullyLogo = createTypefullyLogo();

    const typefullyText = document.createElement("span");
    typefullyText.innerText = "Reply with Typefully";

    typefullyReplyLinkElement.appendChild(typefullyLogo);
    typefullyReplyLinkElement.appendChild(typefullyText);

    modal.appendChild(typefullyReplyLinkElement);
  }
};

/* ----------------------------- Typefully Utils ---------------------------- */

const createTypefullyLinkElement = (id, className) => {
  const typefullyReplyLink = document.createElement("a");
  typefullyReplyLink.id = id;
  typefullyReplyLink.className = className;
  typefullyReplyLink.setAttribute("role", "button");
  typefullyReplyLink.setAttribute("tabindex", "0");
  return typefullyReplyLink;
};

const createTypefullyLogo = () => {
  const typefullyLogo = document.createElement("div");
  typefullyLogo.innerHTML = `<svg width="20" height="20" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M99.5245 11.5985C78.3619 14.5225 58.8203 35.9628 48.5 53.157C32.5 79.814 29.7308 117.192 31.0696 117.039C31.8856 117.212 41.5 96 46.5 88C54.5 83 64 75.5 64 75.5C64 75.5 50.4269 80.1561 51.5 78.5C53.444 75.5 56.2926 72.5773 56.2926 72.5773C78.9391 65.0252 83.916 53.157 83.916 53.157C83.916 53.157 77.3237 54.812 74.6461 55.117C71.076 55.5236 68.8896 55.4107 67.5 55.117C72.6914 49.101 77.1928 45.9517 82 44.5C85.9147 43.15 93.0515 38.6801 98 34.5C102.103 27.8334 100.351 18.8543 99.5245 11.5985Z" fill="white"/>
<circle cx="82.5" cy="107.5" r="8.5" fill="white"/>
</svg>`;
  typefullyLogo.style.position = "relative";
  typefullyLogo.style.margin = "0 2px -4px 3px";
  return typefullyLogo;
};

const getCurrentTextAndSendToTypefully = (replyingToLink) => {
  let tweetTextAreaNumber = 0;
  let typefullyContent = "";

  while (true) {
    if (
      document.querySelector(
        `[data-testid="tweetTextarea_${tweetTextAreaNumber}"]`
      )
    ) {
      if (tweetTextAreaNumber > 0) {
        typefullyContent = `${typefullyContent}\n\n\n\n\n`;
      }

      let tweetTextItems = Array.from(
        document.querySelectorAll(
          `[data-testid="tweetTextarea_${tweetTextAreaNumber}"] [data-text="true"]`
        )
      );

      // remove trailing newlines at end of tweets (there is always one last <br> on the first tweet DOM node)
      tweetTextItems = tweetTextItems.filter(
        (item, index) =>
          !(item.tagName === "BR" && index === tweetTextItems.length - 1)
      );

      tweetTextItems.forEach((item, index) => {
        const isLastItem = index === tweetTextItems.length - 1;
        const isTagOrMention = (item) =>
          !!item.parentElement.parentElement.attributes.style;

        // handle hard break (2 newlines) within single tweet
        if (item.tagName === "BR" && !isLastItem) {
          typefullyContent += "\n\n";
        }
        // handle regular text (<span> elements)
        else {
          typefullyContent = `${typefullyContent}${item.innerText}`;

          // this handles non-hard breaks (just one newline) within a single tweet
          if (!isLastItem && !isTagOrMention(tweetTextItems[index + 1])) {
            typefullyContent += "\n";
          }
        }
      });
    } else {
      break;
    }

    tweetTextAreaNumber = tweetTextAreaNumber + 1;
  }

  // With URLSearchParams
  const url = new URL("https://typefully.com/");
  url.searchParams.set("ref", "minimal-twitter");
  url.searchParams.set("new", typefullyContent);
  if (replyingToLink) {
    url.searchParams.set("replyTo", replyingToLink);
  }
  window.open(url.toString());
};
