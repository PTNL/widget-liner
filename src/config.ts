import { EDataBlockType, EDataQueryMethod, EDatasetColumnType, EWidgetConfigViewOptionsType, EDataQueryFunction } from 'ptnl-constructor-sdk/enums';
import { IWidgetConfig } from 'ptnl-constructor-sdk/interfaces';
import { filterBlock, sortBlock } from 'ptnl-constructor-sdk/config-blocks'
import { EBlockKey, EViewOption } from "./enum";


const pointerSylte = [
    ['circle', 'Круг', 'Circle'],
    ['triangle', 'Треугольник', 'Triangle'],
    ['rect', 'Прямоугольник', 'rect'],
    ['rectRounded', 'Прямоугольник с закругленными углами', 'Rect rounded'],
    ['rectRot', 'Ромб', 'Rect rot'],
    ['cross', 'Плюс', 'Cross'],
    ['crossRot', 'Крест', 'Cross rot'],
    ['star', 'Звезда', 'Star'],
    ['line', 'Линия', 'Line'],
    ['dash', 'Тире', 'Dash']
];

export const config: IWidgetConfig = {
    label: {
        ru: 'Линейный',
        en: 'Liner',
    },
    icon: 'assets/icon.svg',
    dataOptions: [
        {
            method: EDataQueryMethod.Aggregate,
            blocks: [
                {
                    type: EDataBlockType.Column,
                    key: EBlockKey.X,
                    dataType: EDatasetColumnType.Dimension,
                    function: EDataQueryFunction.Group,
                    label: {
                        ru: "X",
                        en: "X"
                    },
                    max: 1
                },
                {
                    type: EDataBlockType.Column,
                    key: EBlockKey.Category,
                    dataType: EDatasetColumnType.Dimension,
                    function: EDataQueryFunction.Group,
                    label: {
                        ru: "Категория",
                        en: "Category"
                    },
                    max: 1
                },
                {
                    type: EDataBlockType.Column,
                    key: EBlockKey.Y,
                    dataType: EDatasetColumnType.Fact,
                    function: EDataQueryFunction.Sum,
                    label: {
                        ru: "Y",
                        en: "Y"
                    }
                },
                ...filterBlock, 
                ...sortBlock
            ],
        }
    ],
    viewOptions: [
        {
            type: EWidgetConfigViewOptionsType.Checkbox,
            key: EViewOption.DataLabels,
            label: {
                ru: "Значение в графике",
                en: "Value in the chart"
            },
            defaultValue: true
        },
        {
            type: EWidgetConfigViewOptionsType.Checkbox,
            key: EViewOption.GridX,
            label: {
                ru: "Сетка по X",
                en: "Grid X"
            },
            defaultValue: true
        },
        {
            type: EWidgetConfigViewOptionsType.Checkbox,
            key: EViewOption.GridY,
            label: {
                ru: "Cетка по Y",
                en: "Grid Y"
            },
            defaultValue: true
        },
        {
            type: EWidgetConfigViewOptionsType.Splitter
        },
        {
            type: EWidgetConfigViewOptionsType.Checkbox,
            key: EViewOption.Fill,
            label: {
                ru: "Фоновая заливка",
                en: "Background fill"
            },
            defaultValue: true
        },
        {
            type: EWidgetConfigViewOptionsType.Checkbox,
            key: EViewOption.Legend,
            label: {
                ru: "Легенда",
                en: "Legend"
            },
            defaultValue: true
        },
        {
            type: EWidgetConfigViewOptionsType.Checkbox,
            key: EViewOption.TickX,
            label: {
                ru: "Подписи по X",
                en: "X signatures"
            },
            defaultValue: true
        },
        {
            type: EWidgetConfigViewOptionsType.Checkbox,
            key: EViewOption.TickY,
            label: {
                ru: "Подписи по Y",
                en: "Y signatures"
            },
            defaultValue: true
        },
        {
            type: EWidgetConfigViewOptionsType.Splitter
        },
        {
            type: EWidgetConfigViewOptionsType.Checkbox,
            key: EViewOption.Line,
            label: {
                ru: "Линии",
                en: "Line"
            },
            defaultValue: true
        },
        {
            type: EWidgetConfigViewOptionsType.Checkbox,
            key: EViewOption.LineTension,
            label: {
                ru: "Сглаживание",
                en: "Smoothing",
            },
            defaultValue: true,
        },
        {
            type: EWidgetConfigViewOptionsType.Select,
            key: EViewOption.PointerStyle,
            label: {
                ru: "Стиль точки",
                en: "Pointer style"
            },
            options: pointerSylte.map(item => {
                const [value, ru, en] = item;

                return {
                    label: {
                        ru,
                        en,
                    },
                    value
                }
            }),
            defaultValue: pointerSylte[0][0]
        }
    ]
};
