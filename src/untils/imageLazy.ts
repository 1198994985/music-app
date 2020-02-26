export let imageLzy = function (imgSelector: string, fn?: (el?: any) => void) {
  
  let observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      try {

        if (entry && entry.isIntersecting) {
          // @ts-ignore
          if (entry.target.dataset.src) {
            // @ts-ignore
            entry.target.src = entry.target.dataset.src;
            if (typeof fn === "function") fn(entry.target);
          }
          observer.unobserve(entry.target);
        }
      } catch (error) {
        console.log(error);
      }
    });
  });
  let imgs = document.querySelectorAll(imgSelector);
  imgs.forEach(img => {
    observer.observe(img);
  });
};

/**
 *
 * @param sub {string} 选择器，需要吸顶的元素
 * @param container {string} 容器
 * @param reference {string} 这个元素要放到sub的正上方，作为参照，要存在高度
 */
export const scrollFixed = function(
  sub: string,
  container: string,
  reference: string,
  fn?: (el?: any) => void
) {
  const header = document.querySelector(sub);
  const fixedTopReference = document.querySelector(reference);
  let catinerDom = document.querySelector(container);
  if (!header || !fixedTopReference) return;
  if (!catinerDom) catinerDom = document.documentElement;
  let observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        try {
          if (
            !entry.isIntersecting &&
            entry.boundingClientRect.top <
              catinerDom!.getBoundingClientRect().top
          ) {
            header.classList.add("fixed");
            if (typeof fn === "function") fn(entry.isIntersecting);
          } else {
            header.classList.remove("fixed");
            if (typeof fn === "function") fn(entry.isIntersecting);
          }
        } catch (error) {
          console.log(error);
        }
      });
    },
    {
      root: document.querySelector(container)
    }
  );
  observer.observe(fixedTopReference); // 添加需要被观察的元素。
};
