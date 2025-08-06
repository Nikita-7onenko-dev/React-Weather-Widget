    const path = require('path');
    const HtmlWebpackPlugin = require('html-webpack-plugin');
    const MiniCssExtractPlugin = require('mini-css-extract-plugin');
    const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');

    module.exports = (env) => {
        const isDev = env.mode === 'development'; // Считываем из переменной окружения является ли режим сборки - режимом разработки
        return {
            mode: env.mode, // Считываем из энв переменной режим сборки
            devtool: isDev ? 'source-map' : false, // source-map для js, позволяет корректно отображать откуда приходят ошибки в devtools в браузере

            entry: path.resolve(__dirname, 'source/main'),  // Точка входа указываем основной скрипт (если есть поле resolve можно без расширения файлов, расширения будут браться оттуда)

            cache: {
                type: 'filesystem', // Хранить кеш на жестком диске
                cacheDirectory: path.resolve(__dirname, '.webpack-cache'), // Хранить кеш в этой директории 
                buildDependencies: {
                    config: [__filename] // Пересобирать кеш когда изменится файл указанный в конфиг (__filename - путь к текущему файлу webpack.config.js) - кеш будет пере-собираться при изменении конфига вебПак
                }
            },

            output: {
                path: path.resolve(__dirname, 'dist'),
                filename: 'main.[contenthash].js', // Выход, имя файла с хешем
                clean: true, // Очищать старые файлы
            },
            resolve: {
                extensions: ['.js', ".jsx", '.scss'], //  Массив с расширениями файлов, чтобы не указывать каждому расширение
            },
            devServer: {
                static: {
                    directory: path.resolve(__dirname, 'public') // это путь к папке, откуда webpack-dev-server будет раздавать готовые файлы (например, index.html и bundle.js).
                },
                watchFiles: ['source/**/*', 'public/img/*'], // Наблюдения за файлами, которые Webpack напрямую не обрабатывает, но которые ты всё равно хочешь, чтобы он отслеживал и перезагружал страницу при их изменении. "имя_папки/** - значит все папки / * - значит все файлы в каждой из этих папок"
                hot: true, // Для умного обновления без перезагрузки страницы
                liveReload: true, // Скорее всего тру по умолчанию, однако поставим явно, для авто перезагрузки страницы при изменениях
                open: true, // Автоматически открывать браузер при запуске сервера
            },
            module: {  // Тут указываем регулярные выражения для файлов подлежащих преобразованию, и последовательность лоадеров для преобразований
                rules: [  // Массив правил для преобразований
                    {
                        test: /\.module\.s[ac]ss$/i, // Правила преобразования для css модулей 
                        use: [  
                            isDev ? "style-loader" :  MiniCssExtractPlugin.loader, // При дев-сборке - обычный style-loader, при прод-сборке - минификатор
                            {
                                loader: "css-loader",
                                options: {
                                    modules: {
                                        localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:6]' // Правила наименования классов внутри модулей
                                    },
                                    sourceMap: isDev,
                                },

                            },
                            "sass-loader",
                        ]
                    },
                    {
                        test: /\.s[ac]ss$/i, // регулярное выражение для поиска файлов
                        exclude: /\.module\.s[ac]ss$/, // Исключить модульные стили обрабатывать только глобальные
                        use: [ // Массив лоадеров для преобразований. Обязательно важна правильная последовательность!
                                isDev ? "style-loader" : MiniCssExtractPlugin.loader, // При дев-сборке - обычный style-loader, при прод-сборке - минификатор
                                "css-loader",
                                "sass-loader",
                        ],
                    },
                    {
                        test: /\.jsx?$/, // Регулярка для поиска файлов
                        exclude: /node_modules/, // Регулярное выражение для поиска исключения, в данном случае папка чтобы не искал js в нод модулях
                        use: {
                            loader: "babel-loader", // Бэйбл для преобразования нового js и jsx в старый понятный старым браузерам синтаксис
                            options: {
                                presets: [
                                    [ "@babel/preset-env", {targets: "> 0.25%, not dead"} ], // Настройка для преобразования нативного js в более старый, на сколько старый определяет поле targets:
                                    // "> 0.25%"  значит «Поддерживать те браузеры, которыми пользуются более 0.25% пользователей по всему миру.» Это относится к глобальной статистике использования браузеров по данным Can I Use и Browserslist. 0.25 это миллионы пользователей:) 
                                    // "not dead" значит исключить браузеры с нулевой поддержкой и нулевым количеством пользователей

                                    ["@babel/preset-react", {runtime: "automatic"} ]// Настройка для преобразования jsx в js, настройка runtime позволяет не писать импорт реакт в каждый компонент
                                ]
                            }
                        },
                    },
                    {
                        test: /\.(png|jpe?g|gif|webp|svg)$/i, // Для изображений
                        type: 'asset/resource', // Или asset/inline или asset, если нужно другое поведение
                    },
                ]
            },
            plugins: [
                new HtmlWebpackPlugin({ // создание HTML-файла на основе шаблона и автоматический импорт js сборки в созданный HTML
                    template: path.resolve(__dirname, 'public/index.html'), // Путь к шаблону
                    filename: 'index.html', // Имя выходного файла
                }),
                !isDev && new MiniCssExtractPlugin({
                    filename: 'style.[contenthash].css',
                }) //  создание CSS-файла для каждого JS-файла (только для production-режима) 
            ].filter(p => Boolean(p)), // Фильтруем массив плагинов на случай если в дев-сборке эта строка вернет false

            optimization: {  
                minimize: !isDev, // Без minimize: true Webpack просто не будет минимизировать, даже если указаны минимайзеры.
                minimizer: [
                    !isDev && new CssMinimizerWebpackPlugin(), // Сжать стили для прод-сборки
                ].filter(Boolean) // Тоже фильтруем по булевым значениям чтобы исключить false и undefined из настройки
            }
    }
    };
