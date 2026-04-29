import { Injectable } from "@nestjs/common";
import { Advert } from "./advert.interface";

@Injectable()
export class AdvertRepository{
private advert: Advert[]= [{
    id:0,
    image: "https://www.https://cdn-user30887.skyeng.ru/uploads/676a6bc61e5f5444662850.webp.com/hubfs/Site%20Pages/NEST_OGImage_1200x630-v2.png",
    content: "Classified Ads That Work — Realize makes advertising easy: apps, websites, or digital display ads. Use Realize to optimize your internet advertising.Looking for the best commercials all in one place? Advert.ge has got you covered! Our extensive database is like IMDb for commercials, providing you with a ",
    link: "http://lw;àewv/sjfks",
}
]

private idCounter:number = 1
findAll():Advert[]{
    return this.advert;
}
}