enum EPopupName {
  ADD_USER = "add-user",
  DELETE_ACCOUNT = "delete-account",
  TARIFF_PLAN = "tariff-plan",
  EXIT_FROM_ACCOUNT = "exit-from-account",
}

enum ESocialName {
  VKONTAKTE = "vkontakte",
  INSTAGRAM = "instagram",
  WHATS_APP = "whats-app",
}

interface ISelectItem {
  label: string;
  value: ESocialName;
}

const socialSelectItems: ISelectItem[] = [
  {
    label: "Вконтакте",
    value: ESocialName.VKONTAKTE,
  },
  {
    label: "Инстаграм",
    value: ESocialName.INSTAGRAM,
  },
  {
    label: "WhatsApp",
    value: ESocialName.WHATS_APP,
  },
];

document.addEventListener("DOMContentLoaded", () => {
  const popupItems: NodeListOf<HTMLDivElement> =
    document.documentElement.querySelectorAll(".popup");
  const closePopupItems: NodeListOf<HTMLElement> =
    document.documentElement.querySelectorAll(".close-popup-item");
  const socialSelects: NodeListOf<HTMLDivElement> =
    document.documentElement.querySelectorAll(".select-social");

  const closeSelectHandler = (node: HTMLDivElement): void => {
    node.classList.remove("base-select--active");
  };

  const handleOutsideClick = (e: MouseEvent): void => {
    const path = e.composedPath && e.composedPath();

    socialSelects.forEach((item): void => {
      if (item) {
        const isIncludePath: boolean = path.indexOf(item) !== -1;

        if (!isIncludePath) {
          closeSelectHandler(item);
        }
      }
    });
  };

  socialSelects.forEach((item): void => {
    const localSelectBackdrop: HTMLDivElement = item.querySelector(
      ".base-select__back-drop"
    );
    const localSelectField: HTMLDivElement = item.querySelector(
      ".base-select__field"
    );
    const localSelectFieldText: HTMLDivElement = item.querySelector(
      ".base-select__field-text"
    );
    const localSelectFieldImg: HTMLDivElement = item.querySelector(
      ".base-select__field-img"
    );
    const localSelectFieldInput: HTMLInputElement = item.querySelector(
      ".base-select__field-input"
    );
    const localSelectListItems: NodeListOf<HTMLDivElement> =
      item.querySelectorAll(".base-select__list-item");

    const toggleSelectHandler = (): void => {
      item.classList.toggle("base-select--active");
    };

    localSelectListItems.forEach((selectListItem): void => {
      const socialItemValue: string = selectListItem.dataset.social;
      const selectedSocialItem: ISelectItem | undefined =
        socialSelectItems.filter((item) => item.value === socialItemValue)[0];

      const onClickSelectItem = (): void => {
        if (socialItemValue) {
          localSelectFieldText.textContent = selectedSocialItem.label;
          localSelectFieldInput.value = selectedSocialItem.value;
          localSelectFieldImg.style.backgroundImage = `url(./images/base-select-${selectedSocialItem.value}.png)`;
        }
        closeSelectHandler(item);
      };

      selectListItem.addEventListener("click", onClickSelectItem);
    });

    localSelectField.addEventListener("click", toggleSelectHandler);
    localSelectBackdrop.addEventListener("click", (): void =>
      closeSelectHandler(item)
    );
  });

  const onClosePopups = (): void => {
    popupItems.forEach((item) => item.classList.remove("popup--showed"));
    document.body.classList.remove("overflow-hidden");
  };

  const onShowPopup = (popupName: EPopupName): void => {
    onClosePopups();

    const selectedPopup: HTMLDivElement = document.querySelector(
      `.popup--${popupName}`
    );

    if (!!selectedPopup) {
      selectedPopup.classList.add("popup--showed");
      document.body.classList.add("overflow-hidden");
    }
  };

  Object.keys(EPopupName).forEach((popupName): void => {
    const popupNameValue: EPopupName = EPopupName[popupName];
    const openPopupBtns: NodeListOf<HTMLElement> =
      document.documentElement.querySelectorAll(`.for-${popupNameValue}-popup`);

    openPopupBtns.forEach((item) => {
      item.addEventListener("click", (): void => onShowPopup(popupNameValue));
    });
  });

  closePopupItems.forEach((item) => {
    item.addEventListener("click", onClosePopups);
  });

  document.body.addEventListener("click", handleOutsideClick);
});
