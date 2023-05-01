 define("ClientMessageBridge", ["ConfigurationConstants"],
    function(ConfigurationConstants) {
        return {
            messages: {
                "CreateReatlyViews": {
                    "mode": Terrasoft.MessageMode.BROADCAST,
                    "direction": Terrasoft.MessageDirectionType.PUBLISH
                }
            },
            methods: {
                init: function() {
                    this.callParent(arguments);
                    // Добавление нового конфигурационного объекта в коллекцию конфигурационных объектов.
                    this.addMessageConfig({
                        sender: "CreateReatlyViews",
                        messageName: "CreateReatlyViews"
                    });
                },
                afterPublishMessage: function(
                    sandboxMessageName,
                    webSocketBody,
                    result,
                    publishConfig) {
                    // Проверка, что сообщение соответствует добавленному в конфигурационный объект.
                    if (sandboxMessageName === "CreateReatlyViews") {
                        window.console.info("Опубликовано сообщение:");
                    }
                }
            }
        };
    });