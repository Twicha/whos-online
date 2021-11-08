var EPopupName;
(function (EPopupName) {
    EPopupName["ADD_USER"] = "add-user";
    EPopupName["DELETE_ACCOUNT"] = "delete-account";
    EPopupName["TARIFF_PLAN"] = "tariff-plan";
    EPopupName["EXIT_FROM_ACCOUNT"] = "exit-from-account";
})(EPopupName || (EPopupName = {}));
var ESocialName;
(function (ESocialName) {
    ESocialName["VKONTAKTE"] = "vkontakte";
    ESocialName["INSTAGRAM"] = "instagram";
    ESocialName["WHATS_APP"] = "whats-app";
})(ESocialName || (ESocialName = {}));
var socialSelectItems = [
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
document.addEventListener("DOMContentLoaded", function () {
    var popupItems = document.documentElement.querySelectorAll(".popup");
    var closePopupItems = document.documentElement.querySelectorAll(".close-popup-item");
    var socialSelects = document.documentElement.querySelectorAll(".select-social");
    var closeSelectHandler = function (node) {
        node.classList.remove("base-select--active");
    };
    var handleOutsideClick = function (e) {
        var path = e.composedPath && e.composedPath();
        socialSelects.forEach(function (item) {
            if (item) {
                var isIncludePath = path.indexOf(item) !== -1;
                if (!isIncludePath) {
                    closeSelectHandler(item);
                }
            }
        });
    };
    socialSelects.forEach(function (item) {
        var localSelectBackdrop = item.querySelector(".base-select__back-drop");
        var localSelectField = item.querySelector(".base-select__field");
        var localSelectFieldText = item.querySelector(".base-select__field-text");
        var localSelectFieldImg = item.querySelector(".base-select__field-img");
        var localSelectFieldInput = item.querySelector(".base-select__field-input");
        var localSelectListItems = item.querySelectorAll(".base-select__list-item");
        var toggleSelectHandler = function () {
            item.classList.toggle("base-select--active");
        };
        localSelectListItems.forEach(function (selectListItem) {
            var socialItemValue = selectListItem.dataset.social;
            var selectedSocialItem = socialSelectItems.filter(function (item) { return item.value === socialItemValue; })[0];
            var onClickSelectItem = function () {
                if (socialItemValue) {
                    localSelectFieldText.textContent = selectedSocialItem.label;
                    localSelectFieldInput.value = selectedSocialItem.value;
                    localSelectFieldImg.style.backgroundImage = "url(./images/base-select-" + selectedSocialItem.value + ".png)";
                }
                closeSelectHandler(item);
            };
            selectListItem.addEventListener("click", onClickSelectItem);
        });
        localSelectField.addEventListener("click", toggleSelectHandler);
        localSelectBackdrop.addEventListener("click", function () {
            return closeSelectHandler(item);
        });
    });
    var onClosePopups = function () {
        popupItems.forEach(function (item) { return item.classList.remove("popup--showed"); });
        document.body.classList.remove("overflow-hidden");
    };
    var onShowPopup = function (popupName) {
        onClosePopups();
        var selectedPopup = document.querySelector(".popup--" + popupName);
        if (!!selectedPopup) {
            selectedPopup.classList.add("popup--showed");
            document.body.classList.add("overflow-hidden");
        }
    };
    Object.keys(EPopupName).forEach(function (popupName) {
        var popupNameValue = EPopupName[popupName];
        var openPopupBtns = document.documentElement.querySelectorAll(".for-" + popupNameValue + "-popup");
        openPopupBtns.forEach(function (item) {
            item.addEventListener("click", function () { return onShowPopup(popupNameValue); });
        });
    });
    closePopupItems.forEach(function (item) {
        item.addEventListener("click", onClosePopups);
    });
    document.body.addEventListener("click", handleOutsideClick);
});
