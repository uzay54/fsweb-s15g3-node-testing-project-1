const utils = require("./index");

describe("[Görev 1] nesneyiTrimle", () => {
  test("[1] propları trimlenmiş bir nesne döndürüyor", () => {
    // ÖRNEK
    const input = { foo: "  foo ", bar: "bar ", baz: " baz" };
    const expected = { foo: "foo", bar: "bar", baz: "baz" };
    const actual = utils.nesneyiTrimle(input);
    expect(actual).toEqual(expected);
  });
  test("[2] orjinalini değiştirmez yeni bir kopya döner", () => {
    const input = { foo: "  foo ", bar: "bar ", baz: " baz" };
    utils.nesneyiTrimle(input);
    expect(input).toEqual({ foo: "  foo ", bar: "bar ", baz: " baz" });
  });
});

describe("[Görev 2] verileniTrimle", () => {
  test("[3] verilen propu trimliyor", () => {
    const input = { isim: "  jane  ", yas: " 34 " };
    const expected = { isim: "jane", yas: " 34 " };
    const actual = utils.verileniTrimle(input, "isim");
    expect(actual).toEqual(expected);
  });
  test("[4] verilen dışındaki proplar trimlenmeden döndürülüyor", () => {
    const input = { isim: "  jane  ", yas: " 34 " };
    const actual = utils.verileniTrimle(input, "isim");
    expect(input.yas).toBe(" 34 ");
  });
  test("[4a] verilen dışındaki proplar trimlenmeden döndürülüyor", () => {
    const input = { isim: "  jane  ", yas: " 34 " };
    const actual = utils.verileniTrimle(input);
    expect(actual).toEqual(input);
  });
});

describe("[Görev 3] enBuyukTamsayiyiBul", () => {
  test("[5] bir dizi nesne içindeki en büyük tamsayiyi döndürüyor { tamsayi: 2 }", () => {
    const input = [{ tamsayi: 1 }, { tamsayi: 3 }, { tamsayi: 2 }];
    const expected = 3;
    const actual = utils.enBuyukTamsayiyiBul(input);
    expect(actual).toBe(expected);
    const input1 = [{ tamsayi: -1 }, { tamsayi: -3 }, { tamsayi: -2 }];
    const expected1 = -1;
    const actual1 = utils.enBuyukTamsayiyiBul(input1);
    expect(actual1).toBe(expected1);
  });
});

describe("[Görev 4] Sayici", () => {
  let sayici;
  beforeEach(() => {
    sayici = new utils.Sayici(3); // her test yeni bir sayı ile başlatılıyor
  });
  test("[6] sayici.asagiSay ilk çağırılışında başlangıç sayışını yapıyor", () => {
    expect(sayici.asagiSay()).toBe(3);
  });
  test("[7] sayici.asagiSay İKİNCİ çağırılışında başlangıç eksi 1 sayıyor", () => {
    sayici.asagiSay();
    expect(sayici.asagiSay()).toBe(2);
  });
  test("[8] sayıcı sonunda sıfıra ulaşır ama daha aşağı saymaz", () => {
    sayici.asagiSay();
    sayici.asagiSay();
    sayici.asagiSay();
    sayici.asagiSay();
    expect(sayici.asagiSay()).toBe(0);
  });
});

describe("[Görev 5] Mevsimler", () => {
  let mevsimler;
  beforeEach(() => {
    mevsimler = new utils.Mevsimler(); // her test yeni bir mevsimle başlar
  });
  test('[9] mevsimler.sonraki İLK çağırılışında "yaz" döndürüyor', () => {
    expect(mevsimler.sonraki()).toBe("yaz");
  });
  test('[10] mevsimler.sonraki İKİNCİ çağırılışında "sonbahar" döndürüyor', () => {
    var repeat = 2;
    for (var i = 1; i < repeat; i++) {
      mevsimler.sonraki();
    }
    expect(mevsimler.sonraki()).toBe("sonbahar");
  });
  test('[11] mevsimler.sonraki ÜÇÜNCÜ çağırılışında "kış" döndürüyor', () => {
    var repeat = 3;
    for (var i = 1; i < repeat; i++) {
      mevsimler.sonraki();
    }
    expect(mevsimler.sonraki()).toBe("kış");
  });
  test('[12] mevsimler.sonraki DÖRDÜNCÜ çağırılışında "ilkbahar" döndürüyor', () => {
    var repeat = 4;
    for (var i = 1; i < repeat; i++) {
      mevsimler.sonraki();
    }
    expect(mevsimler.sonraki()).toBe("ilkbahar");
  });
  test('[13] mevsimler.sonraki BEŞİNCİ çağırılışında "yaz" döndürüyor', () => {
    var repeat = 5;
    for (var i = 1; i < repeat; i++) {
      mevsimler.sonraki();
    }
    expect(mevsimler.sonraki()).toBe("yaz");
  });
  test('[14] mevsimler.sonraki KIRKINCI çağırılışında "ilkbahar" döndürüyor', () => {
    var repeat = 40;
    for (var i = 1; i < repeat; i++) {
      mevsimler.sonraki();
    }
    expect(mevsimler.sonraki()).toBe("ilkbahar");
  });
});

describe("[Görev 6] Araba", () => {
  let focus;
  beforeEach(() => {
    focus = new utils.Araba("focus", 20, 30); // her test yeni bir araba oluşturur
  });
  test("[15] arabayı sürünce güncellenmiş odometer döndürüyor", () => {
    expect(focus.sur(100)).toEqual(100);
    expect(focus.sur(100)).toEqual(200);
  });

  test("[16] arabayı sürmek benzin tüketiyor", () => {
    focus.sur(600);
    expect(focus.sur(1)).toEqual(600);
    expect(focus.sur(100)).toEqual(600);
    expect(focus.depo).toBe(0);
  });

  test("[17] benzinalma arabayı sürmeye izin veriyor", () => {
    focus.sur(600);
    focus.benzinal(20);
    focus.sur(300);
    expect(focus.odometer).toBe(900);
  });
  test("[18] dolu depoya benzin alma etki etmiyor", () => {
    focus.benzinal(100);
    focus.sur(1000);
    expect(focus.odometer).toBe(600);
  });
});

describe("[Görev 7] asenkronCiftSayi", () => {
  test("[19] bir çift sayı verilirse true çözümlüyor", async () => {
    const number = await utils.asenkronCiftSayi(2);
    expect(number).toBe(true);
  });
  test("[20] tek sayı verilirse false çözümlüyor", async () => {
    const number = await utils.asenkronCiftSayi(3);
    expect(number).toBe(false);
  });
});