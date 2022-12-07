import { Labels } from "../enums";

interface Item {
  name: string;
  status: boolean;
  mandatory: boolean;
}

export default function foodList(value: number): Item[] {
  switch (value) {
    case Labels.all:
      return [
        {
          name: "arroz",
          status: true,
          mandatory: true,
        },
        {
          name: "feijão",
          status: true,
          mandatory: true,
        },
        {
          name: "óleo",
          status: true,
          mandatory: true,
        },
        {
          name: "açuçar",
          status: true,
          mandatory: true,
        },
      ];

    case Labels.missing_rice:
      return [
        {
          name: "arroz",
          status: false,
          mandatory: true,
        },
        {
          name: "feijão",
          status: true,
          mandatory: true,
        },
        {
          name: "óleo",
          status: true,
          mandatory: true,
        },
        {
          name: "açuçar",
          status: true,
          mandatory: true,
        },
      ];
    case Labels.missing_bean:
      return [
        {
          name: "arroz",
          status: true,
          mandatory: true,
        },
        {
          name: "feijão",
          status: false,
          mandatory: true,
        },
        {
          name: "óleo",
          status: true,
          mandatory: true,
        },
        {
          name: "açuçar",
          status: true,
          mandatory: true,
        },
      ];
    case Labels.missing_oil:
      return [
        {
          name: "arroz",
          status: true,
          mandatory: true,
        },
        {
          name: "feijão",
          status: true,
          mandatory: true,
        },
        {
          name: "óleo",
          status: false,
          mandatory: true,
        },
        {
          name: "açuçar",
          status: true,
          mandatory: true,
        },
      ];
    case Labels.missing_sugar:
      return [
        {
          name: "arroz",
          status: true,mandatory: true,
        },
        {
          name: "feijão",
          status: true,
          mandatory: true,
        },
        {
          name: "óleo",
          status: true,
          mandatory: true,
        },
        {
          name: "açuçar",
          status: false,
          mandatory: true,
        },
      ];
    case Labels.missing_rice_bean:
      return [
        {
          name: "arroz",
          status: false,
          mandatory: true,
        },
        {
          name: "feijão",
          status: false,
          mandatory: true,
        },
        {
          name: "óleo",
          status: true,
          mandatory: true,
        },
        {
          name: "açuçar",
          status: true,
          mandatory: true,
        },
      ];
    case Labels.missing_rice_oil:
      return [
        {
          name: "arroz",
          status: false,
          mandatory: true,
        },
        {
          name: "feijão",
          status: true,
          mandatory: true,
        },
        {
          name: "óleo",
          status: false,
          mandatory: true,
        },
        {
          name: "açuçar",
          status: true,
          mandatory: true,
        },
      ];
    case Labels.missing_rice_sugar:
      return [
        {
          name: "arroz",
          status: false,
          mandatory: true,
        },
        {
          name: "feijão",
          status: true,
          mandatory: true,
        },
        {
          name: "óleo",
          status: true,
          mandatory: true,
        },
        {
          name: "açuçar",
          status: false,
          mandatory: true,
        },
      ];
    case Labels.missing_bean_oil:
      return [
        {
          name: "arroz",
          status: true,
          mandatory: true,
        },
        {
          name: "feijão",
          status: false,
          mandatory: true,
        },
        {
          name: "óleo",
          status: false,
          mandatory: true,
        },
        {
          name: "açuçar",
          status: true,
          mandatory: true,
        },
      ];
    case Labels.missing_bean_sugar:
      return [
        {
          name: "arroz",
          status: true,
          mandatory: true,
        },
        {
          name: "feijão",
          status: false,
          mandatory: true,
        },
        {
          name: "óleo",
          status: true,
          mandatory: true,
        },
        {
          name: "açuçar",
          status: false,
          mandatory: true,
        },
      ];
    case Labels.missing_oil_sugar:
      return [
        {
          name: "arroz",
          status: true,
          mandatory: true,
        },
        {
          name: "feijão",
          status: true,
          mandatory: true,
        },
        {
          name: "óleo",
          status: false,
          mandatory: true,
        },
        {
          name: "açuçar",
          status: false,
          mandatory: true,
        },
      ];
    case Labels.missing_rice_bean_oil:
      return [
        {
          name: "arroz",
          status: false,
          mandatory: true,
        },
        {
          name: "feijão",
          status: false,
          mandatory: true,
        },
        {
          name: "óleo",
          status: false,
          mandatory: true,
        },
        {
          name: "açuçar",
          status: true,
          mandatory: true,
        },
      ];
    case Labels.missing_rice_bean_sugar:
      return [
        {
          name: "arroz",
          status: false,
          mandatory: true,
        },
        {
          name: "feijão",
          status: false,
          mandatory: true,
        },
        {
          name: "óleo",
          status: true,
          mandatory: true,
        },
        {
          name: "açuçar",
          status: false,
          mandatory: true,
        },
      ];
    case Labels.missing_bean_oil_sugar:
      return [
        {
          name: "arroz",
          status: true,
          mandatory: true,
        },
        {
          name: "feijão",
          status: false,
          mandatory: true,
        },
        {
          name: "óleo",
          status: false,
          mandatory: true,
        },
        {
          name: "açuçar",
          status: false,
          mandatory: true,
        },
      ];
    case Labels.none:
      return [
        {
          name: "arroz",
          status: false,
          mandatory: true,
        },
        {
          name: "feijão",
          status: false,
          mandatory: true,
        },
        {
          name: "óleo",
          status: false,
          mandatory: true,
        },
        {
          name: "açuçar",
          status: false,
          mandatory: true,
        },
      ];

    default:
      return [
        {
          name: "arroz",
          status: true,
          mandatory: true,
        },
        {
          name: "feijão",
          status: true,
          mandatory: true,
        },
        {
          name: "óleo",
          status: true,
          mandatory: true,
        },
        {
          name: "açuçar",
          status: true,
          mandatory: true,
        },
      ];
  }
}
