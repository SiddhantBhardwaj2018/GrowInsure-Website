const _0x137ab4 = _0x37f9;
(function (_0x1dd288, _0x1e896a) {
  const _0x1a07bb = _0x37f9,
    _0x3f505e = _0x1dd288();
  while (!![]) {
    try {
      const _0x1847ed =
        (parseInt(_0x1a07bb(0x202)) / 0x1) *
          (-parseInt(_0x1a07bb(0x208)) / 0x2) +
        (-parseInt(_0x1a07bb(0x1cf)) / 0x3) *
          (-parseInt(_0x1a07bb(0x1f0)) / 0x4) +
        -parseInt(_0x1a07bb(0x21f)) / 0x5 +
        -parseInt(_0x1a07bb(0x1d0)) / 0x6 +
        -parseInt(_0x1a07bb(0x1fc)) / 0x7 +
        (parseInt(_0x1a07bb(0x1e2)) / 0x8) *
          (-parseInt(_0x1a07bb(0x200)) / 0x9) +
        parseInt(_0x1a07bb(0x217)) / 0xa;
      if (_0x1847ed === _0x1e896a) break;
      else _0x3f505e["push"](_0x3f505e["shift"]());
    } catch (_0x5ba843) {
      _0x3f505e["push"](_0x3f505e["shift"]());
    }
  }
})(_0x5c45, 0x213c4);
function _0x37f9(_0x1c06a2, _0xe859d7) {
  const _0x5c4581 = _0x5c45();
  return (
    (_0x37f9 = function (_0x37f923, _0x5e5650) {
      _0x37f923 = _0x37f923 - 0x1c3;
      let _0x4a5115 = _0x5c4581[_0x37f923];
      return _0x4a5115;
    }),
    _0x37f9(_0x1c06a2, _0xe859d7)
  );
}
let explainPara = document[_0x137ab4(0x216)]("explainPara"),
  modalBtn = document[_0x137ab4(0x216)]("modalBtn");
const scrollToElement = (_0xbed98a) => {
  const _0xd1a634 = _0x137ab4,
    _0x56bc9c = document[_0xd1a634(0x216)](_0xbed98a);
  if (_0x56bc9c) {
    const _0xf03af1 = _0x56bc9c[_0xd1a634(0x1f9)](),
      _0x5ce1d4 = window[_0xd1a634(0x1fe)] + _0xf03af1[_0xd1a634(0x210)] - 0x64;
    window[_0xd1a634(0x212)]({ top: _0x5ce1d4, behavior: _0xd1a634(0x21c) });
  }
};
document["addEventListener"](_0x137ab4(0x1dd), (_0x1f3221) => {
  const _0x30061e = _0x137ab4;
  let _0x43a640 = _0x1f3221[_0x30061e(0x1d4)]["id"],
    _0x570458,
    _0x428430,
    _0x424a61,
    _0x15ff81,
    _0x4bbbad,
    _0x4bb145,
    _0x34977d,
    _0x3c2558,
    _0x1d27f2,
    _0x4fa127;
  switch (_0x43a640) {
    case _0x30061e(0x205):
      _0x1f3221["preventDefault"](),
        (_0x570458 = document["getElementById"](_0x30061e(0x1de))),
        (_0x428430 = document[_0x30061e(0x216)](_0x30061e(0x1e5))),
        (_0x424a61 = document[_0x30061e(0x216)]("loanRate")),
        (_0x15ff81 = document["getElementById"](_0x30061e(0x211))),
        (_0x4bbbad = document["getElementById"]("snapshotDiv"));
      let _0x27007a = document["getElementById"](_0x30061e(0x1f8));
      if (
        _0x570458[_0x30061e(0x1db)] !== "" &&
        _0x428430[_0x30061e(0x1db)] !== "" &&
        _0x424a61[_0x30061e(0x1db)] !== "" &&
        _0x15ff81[_0x30061e(0x1db)] !== "" &&
        _0x27007a[_0x30061e(0x1db)] !== ""
      ) {
        if (
          !(
            isNotNumeric(_0x570458[_0x30061e(0x1db)]) &&
            isNotNumeric(_0x428430[_0x30061e(0x1db)]) &&
            isNotNumeric(_0x424a61[_0x30061e(0x1db)]) &&
            isNotNumeric(_0x15ff81[_0x30061e(0x1db)]) &&
            isNotNumeric(_0x27007a[_0x30061e(0x1db)])
          )
        )
          (explainPara["innerText"] =
            "Please\x20enter\x20only\x20numeric\x20values\x20for\x20loan\x20rate,\x20loan\x20period,\x20housing\x20cost,\x20personal\x20contribution\x20and\x20inflation\x20rate\x20to\x20calculate\x20SIP\x20Versus\x20Housing\x20Return"),
            modalBtn[_0x30061e(0x1dd)]();
        else {
          let {
            bankFunding: _0x57fdac,
            emiAmt: _0x4b6af1,
            totalLoanPayment: _0x2953e4,
            loanInterestPaid: _0x24f3ba,
            emiPaymentBalance: _0x2084ff,
            sipInvestFV: _0x143f17,
            houseCostFV: _0x4a30f5,
            profitSIPInvest: _0x34c43c,
            monthlyRent: _0x5010a3,
          } = calculateEMIVersusSIP(
            Number(_0x570458[_0x30061e(0x1db)]),
            Number(_0x27007a[_0x30061e(0x1db)]),
            Number(_0x424a61[_0x30061e(0x1db)]) / 0x64,
            Number(_0x15ff81["value"]),
            Number(_0x428430["value"]) / 0x64
          );
          (_0x4bbbad[_0x30061e(0x201)] = _0x30061e(0x1cd)),
            (_0x4bb145 = document[_0x30061e(0x216)](_0x30061e(0x213))),
            (_0x4bb145[_0x30061e(0x1eb)] = _0x30061e(0x1cb)),
            (showOutput = document[_0x30061e(0x216)](_0x30061e(0x21b))),
            (showOutput["innerHTML"] =
              _0x30061e(0x204) +
              "<table\x20class=\x22w-full\x20text-lg\x20text-left\x20rtl:text-right\x20text-gray-500\x20dark:text-gray-400\x22>" +
              _0x30061e(0x20f) +
              _0x30061e(0x214) +
              "</th>" +
              _0x30061e(0x20e) +
              Intl[_0x30061e(0x1dc)](_0x30061e(0x1ea))[_0x30061e(0x1c7)](
                Math["round"](_0x4b6af1)
              ) +
              _0x30061e(0x1d8) +
              _0x30061e(0x203) +
              _0x30061e(0x20e) +
              Intl[_0x30061e(0x1dc)](_0x30061e(0x1ea))["format"](
                Math[_0x30061e(0x1fd)](_0x2953e4)
              ) +
              _0x30061e(0x1d8) +
              _0x30061e(0x1ee) +
              "<th\x20scope=\x22col\x22\x20class=\x22px-6\x20py-3\x22>\x20₹" +
              Intl["NumberFormat"](_0x30061e(0x1ea))[_0x30061e(0x1c7)](
                Math[_0x30061e(0x1fd)](_0x57fdac)
              ) +
              _0x30061e(0x1d8) +
              _0x30061e(0x1e1) +
              "<th\x20scope=\x22col\x22\x20class=\x22px-6\x20py-3\x22>\x20₹" +
              Intl[_0x30061e(0x1dc)]("en-IN")[_0x30061e(0x1c7)](_0x24f3ba) +
              _0x30061e(0x1d8) +
              "</tr><tr><th\x20scope=\x22col\x22\x20class=\x22px-6\x20py-3\x20text-red-500\x22>Consider\x20Present\x20House\x20Value\x20For\x20Rent</th>" +
              _0x30061e(0x20e) +
              Intl[_0x30061e(0x1dc)]("en-IN")[_0x30061e(0x1c7)](
                Math[_0x30061e(0x1fd)](_0x570458[_0x30061e(0x1db)])
              ) +
              _0x30061e(0x1d8) +
              "</tr><tr><th\x20scope=\x22col\x22\x20class=\x22px-6\x20py-3\x20text-red-500\x22>Monthly\x20Rent\x20At\x203%\x20Rental\x20Yield</th>" +
              _0x30061e(0x20e) +
              Intl[_0x30061e(0x1dc)]("en-IN")[_0x30061e(0x1c7)](
                Math[_0x30061e(0x1fd)](_0x5010a3)
              ) +
              _0x30061e(0x1d8) +
              "</tr><tr><th\x20scope=\x22col\x22\x20class=\x22px-6\x20py-3\x20text-red-500\x22>SIP\x20Amount\x20After\x20EMI</th>" +
              _0x30061e(0x20e) +
              Intl[_0x30061e(0x1dc)]("en-IN")["format"](
                Math["round"](_0x2084ff)
              ) +
              _0x30061e(0x1d8) +
              "</tr><tr><th\x20scope=\x22col\x22\x20class=\x22px-6\x20py-3\x22>Assumed\x20SIP\x20Growth\x20Rate</th>" +
              _0x30061e(0x1ca) +
              "</tr><tr><th\x20scope=\x22col\x22\x20class=\x22px-6\x20py-3\x22>Future\x20Value\x20Of\x20SIP\x20Investment</th>" +
              _0x30061e(0x20e) +
              Intl["NumberFormat"]("en-IN")[_0x30061e(0x1c7)](
                Math[_0x30061e(0x1fd)](_0x143f17)
              ) +
              "</th>" +
              "</tr><tr><th\x20scope=\x22col\x22\x20class=\x22px-6\x20py-3\x22>Future\x20House\x20Valuation\x20With\x20Inflation</th>" +
              _0x30061e(0x20e) +
              Intl["NumberFormat"]("en-IN")[_0x30061e(0x1c7)](
                Math[_0x30061e(0x1fd)](_0x4a30f5)
              ) +
              _0x30061e(0x1d8) +
              _0x30061e(0x1c8) +
              _0x30061e(0x20e) +
              Intl["NumberFormat"](_0x30061e(0x1ea))[_0x30061e(0x1c7)](
                Math[_0x30061e(0x1fd)](_0x34c43c)
              ) +
              "</th>" +
              _0x30061e(0x1d7)),
            scrollToElement(_0x30061e(0x213));
        }
      } else
        (explainPara[_0x30061e(0x215)] = _0x30061e(0x1ef)),
          modalBtn[_0x30061e(0x1dd)]();
      break;
    case _0x30061e(0x1d6):
      _0x1f3221[_0x30061e(0x1c3)](),
        (_0x34977d = document["getElementById"](_0x30061e(0x1f5))),
        (_0x3c2558 = document["getElementById"](_0x30061e(0x1c4))),
        (_0x1d27f2 = document[_0x30061e(0x216)](_0x30061e(0x20b))),
        (_0x15ff81 = document["getElementById"](_0x30061e(0x21a))),
        (_0x4bbbad = document[_0x30061e(0x216)]("snapshotDiv"));
      if (
        _0x34977d[_0x30061e(0x1db)] !== "" &&
        _0x3c2558[_0x30061e(0x1db)] !== "" &&
        _0x1d27f2[_0x30061e(0x1db)] !== "" &&
        _0x15ff81[_0x30061e(0x1db)] !== ""
      ) {
        if (
          !(
            isNotNumeric(_0x34977d[_0x30061e(0x1db)]) &&
            isNotNumeric(_0x3c2558[_0x30061e(0x1db)]) &&
            isNotNumeric(_0x1d27f2["value"]) &&
            isNotNumeric(_0x15ff81[_0x30061e(0x1db)])
          )
        )
          (explainPara[_0x30061e(0x215)] = _0x30061e(0x1f2)),
            modalBtn["click"]();
        else {
          let { reqdCorpus: _0x37a5a6 } = humanLifeMethod(
            Number(_0x34977d[_0x30061e(0x1db)]),
            Number(_0x3c2558["value"]) / 0x64,
            Number(_0x1d27f2["value"]) / 0x64,
            Number(_0x15ff81[_0x30061e(0x1db)])
          );
          (_0x4bbbad["style"] = _0x30061e(0x1cd)),
            (_0x4bb145 = document[_0x30061e(0x216)](_0x30061e(0x213))),
            (_0x4bb145[_0x30061e(0x1eb)] = _0x30061e(0x1e3)),
            (showOutput = document[_0x30061e(0x216)]("showOutput")),
            (showOutput[_0x30061e(0x1eb)] =
              _0x30061e(0x204) +
              _0x30061e(0x1c9) +
              _0x30061e(0x20f) +
              _0x30061e(0x209) +
              _0x30061e(0x1d8) +
              _0x30061e(0x20e) +
              Intl[_0x30061e(0x1dc)]("en-IN")[_0x30061e(0x1c7)](
                Math[_0x30061e(0x1fd)](_0x37a5a6)
              ) +
              _0x30061e(0x1d8) +
              "</tr></thead></table></div>"),
            scrollToElement(_0x30061e(0x213));
        }
      } else
        (explainPara["innerText"] = _0x30061e(0x1c6)),
          modalBtn[_0x30061e(0x1dd)]();
      break;
    case "needApproachBtn":
      _0x1f3221[_0x30061e(0x1c3)](),
        (_0x34977d = document["getElementById"](_0x30061e(0x1f5))),
        (_0x3c2558 = document[_0x30061e(0x216)](_0x30061e(0x1c4))),
        (_0x1d27f2 = document[_0x30061e(0x216)](_0x30061e(0x20b))),
        (_0x15ff81 = document[_0x30061e(0x216)]("timePeriod")),
        (_0x4bbbad = document[_0x30061e(0x216)](_0x30061e(0x20c)));
      let _0x39b5b4 = document[_0x30061e(0x216)](_0x30061e(0x1ce)),
        _0x335828 = document[_0x30061e(0x216)](_0x30061e(0x1ed)),
        _0x9446e0 = document[_0x30061e(0x216)](_0x30061e(0x1e7)),
        _0x36ec12 = document[_0x30061e(0x216)]("deductInsurance"),
        _0xabdb3 = document["getElementById"](_0x30061e(0x206));
      if (
        _0x34977d[_0x30061e(0x1db)] !== "" &&
        _0x3c2558[_0x30061e(0x1db)] !== "" &&
        _0x1d27f2[_0x30061e(0x1db)] !== "" &&
        _0x15ff81["value"] !== "" &&
        _0x39b5b4["value"] !== "" &&
        _0x335828[_0x30061e(0x1db)] !== "" &&
        _0x9446e0[_0x30061e(0x1db)] !== "" &&
        _0x36ec12[_0x30061e(0x1db)] !== "" &&
        _0xabdb3["value"] !== ""
      ) {
        if (
          !(
            isNotNumeric(_0x34977d[_0x30061e(0x1db)]) &&
            isNotNumeric(_0x3c2558[_0x30061e(0x1db)]) &&
            isNotNumeric(_0x1d27f2[_0x30061e(0x1db)]) &&
            isNotNumeric(_0x15ff81[_0x30061e(0x1db)]) &&
            isNotNumeric(_0x39b5b4["value"]) &&
            isNotNumeric(_0x335828[_0x30061e(0x1db)]) &&
            isNotNumeric(_0x9446e0[_0x30061e(0x1db)]) &&
            isNotNumeric(_0x36ec12["value"]) &&
            isNotNumeric(_0xabdb3[_0x30061e(0x1db)])
          )
        )
          (explainPara[_0x30061e(0x215)] = _0x30061e(0x1d3)),
            modalBtn["click"]();
        else {
          let { reqdCorpus: _0xc4bbc9, additionReqdCorpus: _0xc023e0 } =
            needBasedApproach(
              Number(_0x34977d[_0x30061e(0x1db)]),
              Number(_0x3c2558[_0x30061e(0x1db)]) / 0x64,
              Number(_0x1d27f2[_0x30061e(0x1db)]) / 0x64,
              Number(_0x15ff81["value"]),
              Number(_0x39b5b4[_0x30061e(0x1db)]),
              Number(_0x335828["value"]),
              Number(_0x9446e0[_0x30061e(0x1db)]),
              Number(_0x36ec12[_0x30061e(0x1db)]),
              Number(_0xabdb3["value"])
            );
          (_0x4bbbad["style"] = _0x30061e(0x1cd)),
            (_0x4bb145 = document["getElementById"]("resultHeader")),
            (_0x4bb145[_0x30061e(0x1eb)] = _0x30061e(0x1e3)),
            (showOutput = document["getElementById"](_0x30061e(0x21b))),
            (showOutput[_0x30061e(0x1eb)] =
              _0x30061e(0x204) +
              _0x30061e(0x1c9) +
              _0x30061e(0x20f) +
              _0x30061e(0x1d9) +
              _0x30061e(0x1d8) +
              _0x30061e(0x20e) +
              Intl[_0x30061e(0x1dc)](_0x30061e(0x1ea))["format"](
                Math[_0x30061e(0x1fd)](_0xc4bbc9)
              ) +
              _0x30061e(0x1f6) +
              "<tr><th\x20scope=\x22col\x22\x20class=\x22px-6\x20py-3\x22>Insurance\x20Corpus\x20Required\x20(As\x20Per\x20Needs-Based\x20Approach)" +
              "</th>" +
              _0x30061e(0x20e) +
              Intl["NumberFormat"](_0x30061e(0x1ea))[_0x30061e(0x1c7)](
                Math[_0x30061e(0x1fd)](_0xc023e0)
              ) +
              _0x30061e(0x1d8) +
              _0x30061e(0x1d7)),
            scrollToElement(_0x30061e(0x213));
        }
      } else
        (explainPara[_0x30061e(0x215)] = _0x30061e(0x21d)),
          modalBtn[_0x30061e(0x1dd)]();
      break;
    case "crorepatiClacBtn":
      _0x1f3221["preventDefault"](),
        (_0x424a61 = document["getElementById"](_0x30061e(0x218))),
        (_0x15ff81 = document[_0x30061e(0x216)](_0x30061e(0x21a))),
        (_0x4bbbad = document[_0x30061e(0x216)](_0x30061e(0x20c))),
        (_0x4fa127 = document["getElementById"]("targetAmtReqd"));
      if (
        _0x424a61[_0x30061e(0x1db)] !== "" &&
        _0x15ff81[_0x30061e(0x1db)] !== "" &&
        _0x4fa127["value"] !== ""
      ) {
        if (
          !(
            isNotNumeric(_0x424a61["value"]) &&
            isNotNumeric(_0x4fa127["value"]) &&
            isNotNumeric(_0x15ff81["value"])
          )
        )
          (explainPara["innerText"] = _0x30061e(0x1cc)),
            modalBtn[_0x30061e(0x1dd)]();
        else {
          let _0x3f7beb = calculatePmt(
            Number(_0x424a61["value"]) / 0x4b0,
            Number(_0x15ff81[_0x30061e(0x1db)]) * 0xc,
            0x0,
            Number(_0x4fa127[_0x30061e(0x1db)])
          );
          (_0x4bbbad[_0x30061e(0x201)] = _0x30061e(0x1cd)),
            (_0x4bb145 = document[_0x30061e(0x216)](_0x30061e(0x213))),
            (_0x4bb145[_0x30061e(0x1eb)] = _0x30061e(0x1d5)),
            (showOutput = document[_0x30061e(0x216)](_0x30061e(0x21b))),
            (showOutput["innerHTML"] =
              _0x30061e(0x204) +
              _0x30061e(0x1c9) +
              _0x30061e(0x20f) +
              _0x30061e(0x1e9) +
              _0x30061e(0x1d8) +
              _0x30061e(0x20e) +
              Intl[_0x30061e(0x1dc)]("en-IN")[_0x30061e(0x1c7)](
                Math["round"](_0x3f7beb)
              ) +
              "</th></tr>" +
              _0x30061e(0x207)),
            scrollToElement(_0x30061e(0x213));
        }
      } else
        (explainPara["innerText"] = _0x30061e(0x21d)),
          modalBtn[_0x30061e(0x1dd)]();
      break;
    case _0x30061e(0x1d1):
      _0x1f3221[_0x30061e(0x1c3)](),
        (_0x424a61 = document["getElementById"](_0x30061e(0x1e6))),
        (_0x15ff81 = document[_0x30061e(0x216)](_0x30061e(0x21a))),
        (_0x4bbbad = document[_0x30061e(0x216)](_0x30061e(0x20c))),
        (_0x570458 = document[_0x30061e(0x216)](_0x30061e(0x21e)));
      if (
        _0x424a61[_0x30061e(0x1db)] !== "" &&
        _0x15ff81[_0x30061e(0x1db)] !== "" &&
        _0x570458[_0x30061e(0x1db)] !== ""
      ) {
        if (
          !(
            isNotNumeric(_0x424a61["value"]) &&
            isNotNumeric(_0x570458[_0x30061e(0x1db)]) &&
            isNotNumeric(_0x15ff81[_0x30061e(0x1db)])
          )
        )
          (explainPara[_0x30061e(0x215)] = _0x30061e(0x1f1)),
            modalBtn["click"]();
        else {
          let _0x40b595 = calculateFV(
            Number(_0x424a61["value"]) / 0x64,
            Number(_0x15ff81[_0x30061e(0x1db)]),
            0x0,
            Number(_0x570458[_0x30061e(0x1db)])
          );
          const _0x495cf4 = {
            colors: [_0x30061e(0x1fa), "#4CAF50"],
            series: [
              {
                name: _0x30061e(0x1e0),
                data: [Math["round"](_0x570458[_0x30061e(0x1db)]), 0x0],
              },
              { name: _0x30061e(0x1e4), data: [0x0, Math["round"](_0x40b595)] },
            ],
            chart: {
              type: "bar",
              height: _0x30061e(0x20a),
              width: _0x30061e(0x1f4),
              fontFamily: "Inter,\x20sans-serif",
              toolbar: { show: ![] },
            },
            plotOptions: {
              bar: {
                horizontal: ![],
                columnWidth: _0x30061e(0x1f3),
                borderRadius: 0x8,
              },
            },
            tooltip: {
              shared: !![],
              intersect: ![],
              style: { fontFamily: _0x30061e(0x219) },
            },
            states: {
              hover: { filter: { type: _0x30061e(0x20d), value: 0x1 } },
            },
            stroke: { show: !![], width: 0x0, colors: [_0x30061e(0x1c5)] },
            grid: {
              show: ![],
              strokeDashArray: 0x4,
              padding: { left: 0x2, right: 0x2, top: -0xe },
            },
            dataLabels: {
              enabled: ![],
              offsetY: -0x14,
              style: {
                fontSize: _0x30061e(0x1ff),
                fontWeight: _0x30061e(0x1f7),
                colors: ["#fff"],
              },
            },
            legend: {
              position: _0x30061e(0x1fb),
              offsetY: 0xa,
              itemMargin: { horizontal: 0x5 },
            },
            xaxis: {
              categories: [
                Number(_0x570458[_0x30061e(0x1db)]) + "",
                Number(_0x40b595) + "",
              ],
              labels: {
                show: ![],
                style: {
                  fontFamily: "Inter,\x20sans-serif",
                  cssClass: _0x30061e(0x1ec),
                },
              },
              axisBorder: { show: ![] },
              axisTicks: { show: ![] },
            },
            yaxis: { show: ![] },
            fill: { opacity: 0x1 },
          };
          if (
            document[_0x30061e(0x216)](_0x30061e(0x1da)) &&
            typeof ApexCharts !== _0x30061e(0x1df)
          ) {
            const _0x3859ec = new ApexCharts(
              document[_0x30061e(0x216)](_0x30061e(0x1da)),
              _0x495cf4
            );
            _0x3859ec[_0x30061e(0x1d2)]();
          }
          (_0x4bb145 = document[_0x30061e(0x216)](_0x30061e(0x213))),
            (_0x4bb145[_0x30061e(0x1eb)] =
              "<h5\x20class=\x22leading-none\x20text-center\x20text-3xl\x20mb-4\x20font-extrabold\x20text-gray-900\x20dark:text-white\x20pb-1\x22>Future\x20Value\x20of\x20Expense</h5>"),
            (showOutput = document[_0x30061e(0x216)]("showOutput")),
            (showOutput[_0x30061e(0x1eb)] =
              _0x30061e(0x204) +
              _0x30061e(0x1c9) +
              _0x30061e(0x20f) +
              "<tr><th\x20scope=\x22col\x22\x20class=\x22px-6\x20py-3\x22>Present\x20Value\x20of\x20Expense" +
              "</th>" +
              _0x30061e(0x20e) +
              Intl[_0x30061e(0x1dc)](_0x30061e(0x1ea))[_0x30061e(0x1c7)](
                Math["round"](_0x570458["value"])
              ) +
              _0x30061e(0x1f6) +
              _0x30061e(0x1e8) +
              _0x30061e(0x1d8) +
              _0x30061e(0x20e) +
              Intl[_0x30061e(0x1dc)](_0x30061e(0x1ea))[_0x30061e(0x1c7)](
                Math[_0x30061e(0x1fd)](_0x40b595)
              ) +
              _0x30061e(0x1f6) +
              _0x30061e(0x207)),
            scrollToElement("resultHeader");
        }
      } else
        (explainPara["innerText"] = _0x30061e(0x21d)),
          modalBtn[_0x30061e(0x1dd)]();
      break;
    default:
      break;
  }
});
function _0x5c45() {
  const _0x1de605 = [
    "<th\x20scope=\x22col\x22\x20class=\x22px-6\x20py-3\x22>12%</th>",
    "<h5\x20class=\x22leading-none\x20text-center\x20text-3xl\x20mb-4\x20font-extrabold\x20text-gray-900\x20dark:text-white\x20pb-1\x22>House\x20Purchase\x20Vs\x20SIP\x20Investment</h5>",
    "Please\x20enter\x20only\x20numeric\x20values\x20for\x20investment\x20growth\x20rate,\x20target\x20amount,\x20and\x20time\x20period\x20\x20to\x20calculate\x20target\x20SIP\x20to\x20become\x20a\x20crorepati",
    "display:\x22block\x22",
    "outstandingLoanAmt",
    "138243XTaIJI",
    "700440HhFifW",
    "futureExpenseButton",
    "render",
    "Please\x20enter\x20only\x20numeric\x20values\x20for\x20current\x20income,\x20investment\x20growth\x20rate,\x20income\x20increment\x20rate,\x20time\x20period,\x20outstanding\x20loan\x20amount,\x20children\x20education\x20liability,\x20marriage\x20incidental\x20liability,\x20available\x20insurance\x20deductible\x20and\x20current\x20investment\x20balance\x20to\x20calculate\x20Needs\x20Based\x20Value\x20For\x20Insurance",
    "target",
    "<h5\x20class=\x22leading-none\x20text-center\x20text-3xl\x20mb-4\x20font-extrabold\x20text-gray-900\x20dark:text-white\x20pb-1\x22>Target\x20SIP\x20/\x20Plan\x20a\x20Crorepati\x20Target</h5>",
    "humanLifeBtn",
    "</tr></thead></table></div>",
    "</th>",
    "<tr><th\x20scope=\x22col\x22\x20class=\x22px-6\x20py-3\x22>Insurance\x20Corpus\x20Required\x20(As\x20Per\x20Human\x20Life\x20Value\x20Method)",
    "column-chart",
    "value",
    "NumberFormat",
    "click",
    "houseCost",
    "undefined",
    "Present\x20Value\x20of\x20Expense",
    "</tr><tr><th\x20scope=\x22col\x22\x20class=\x22px-6\x20py-3\x22>Interest\x20Paid\x20In\x20Loan</th>",
    "5872BOUqnm",
    "<h5\x20class=\x22leading-none\x20text-center\x20text-3xl\x20mb-4\x20font-extrabold\x20text-gray-900\x20dark:text-white\x20pb-1\x22>Human\x20Life\x20Insurance\x20Amount\x20Results</h5>",
    "Future\x20Value\x20of\x20Expense",
    "inflationRate",
    "rateOfReturn",
    "marriageIncidentalLiability",
    "<tr><th\x20scope=\x22col\x22\x20class=\x22px-6\x20py-3\x22>Future\x20Value\x20of\x20Expense",
    "<tr><th\x20scope=\x22col\x22\x20class=\x22px-6\x20py-3\x22>Required\x20Target\x20SIP\x20To\x20Become\x20Crorepati",
    "en-IN",
    "innerHTML",
    "text-xs\x20font-normal\x20fill-gray-800\x20dark:fill-gray-400",
    "childEducationLiability",
    "</tr><tr><th\x20scope=\x22col\x22\x20class=\x22px-6\x20py-3\x22>Capital\x20Paid\x20In\x20Loan</th>",
    "Please\x20fill\x20in\x20values\x20for\x20loan\x20rate,\x20loan\x20period,\x20housing\x20cost,\x20personal\x20contribution\x20and\x20inflation\x20rate\x20to\x20calculate\x20SIP\x20Versus\x20Housing\x20Return",
    "8gtIfQR",
    "Please\x20enter\x20only\x20numeric\x20values\x20for\x20investment\x20growth\x20rate,\x20target\x20amount,\x20and\x20time\x20period\x20\x20to\x20calculate\x20target\x20Future\x20Value\x20of\x20Expense",
    "Please\x20enter\x20only\x20numeric\x20values\x20for\x20current\x20income,\x20investment\x20growth\x20rate,\x20income\x20increment\x20rate\x20and\x20time\x20period\x20to\x20calculate\x20Human\x20Life\x20Value\x20For\x20Insurance",
    "110%",
    "200px",
    "currentIncome",
    "</th></tr>",
    "bold",
    "selfFunding",
    "getBoundingClientRect",
    "#1A56DB",
    "bottom",
    "919562yussUd",
    "round",
    "pageYOffset",
    "12px",
    "2115OMkRAl",
    "style",
    "1ozsZbH",
    "</tr><tr><th\x20scope=\x22col\x22\x20class=\x22px-6\x20py-3\x22>Total\x20Loan\x20Payment\x20Amount</th>",
    "<div\x20class=\x22max-w-full\x20relative\x20overflow-x-auto\x20shadow-md\x20sm:rounded-lg\x22>",
    "emiSipBtn",
    "currentInvestBalance",
    "</thead></table></div>",
    "375900QorWRx",
    "<tr><th\x20scope=\x22col\x22\x20class=\x22px-6\x20py-3\x22>Insurance\x20Corpus\x20Required",
    "320px",
    "incomeIncrementRate",
    "snapshotDiv",
    "darken",
    "<th\x20scope=\x22col\x22\x20class=\x22px-6\x20py-3\x22>\x20₹",
    "<thead\x20class=\x22text-md\x20text-gray-700\x20bg-gray-50\x20dark:bg-gray-700\x20dark:text-gray-400\x22>",
    "top",
    "loanPeriod",
    "scrollTo",
    "resultHeader",
    "<tr><th\x20scope=\x22col\x22\x20class=\x22px-6\x20py-3\x22>Loan\x20EMI\x20Amount",
    "innerText",
    "getElementById",
    "8749070qSgCsY",
    "growthRate",
    "Inter,\x20sans-serif",
    "timePeriod",
    "showOutput",
    "smooth",
    "Please\x20fill\x20in\x20values\x20for\x20current\x20income,\x20investment\x20growth\x20rate,\x20income\x20increment\x20rate,\x20time\x20period,\x20outstanding\x20loan\x20amount,\x20children\x20education\x20liability,\x20marriage\x20incidental\x20liability,\x20available\x20insurance\x20deductible\x20and\x20current\x20investment\x20balance\x20to\x20calculate\x20Needs\x20Based\x20Value\x20For\x20Insurance",
    "amount",
    "1111955ttRJUx",
    "preventDefault",
    "investGrowthRate",
    "transparent",
    "Please\x20fill\x20in\x20values\x20for\x20current\x20income,\x20investment\x20growth\x20rate,\x20income\x20increment\x20rate\x20and\x20time\x20period\x20to\x20calculate\x20Human\x20Life\x20Value\x20For\x20Insurance",
    "format",
    "</tr><tr><th\x20scope=\x22col\x22\x20class=\x22px-6\x20py-3\x20text-red-500\x22>Profit\x20In\x20SIP\x20Investment\x20Versus\x20EMI</th>",
    "<table\x20class=\x22w-full\x20text-lg\x20text-left\x20rtl:text-right\x20text-gray-500\x20dark:text-gray-400\x22>",
  ];
  _0x5c45 = function () {
    return _0x1de605;
  };
  return _0x5c45();
}
