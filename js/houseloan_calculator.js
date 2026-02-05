var businessShortRateArr6 = [5.1, 5.35, 5.6, 5.85, 6.1, 5.85, 5.6, 5.6, 5.35, 5.1, 4.85, 4.6, 3.45],
    businessShortRateArr12 = [5.56, 5.81, 6.06, 6.31, 6.56, 6.31, 6, 5.6, 5.35, 5.1, 4.85, 4.6, 3.45],
    businessShortRateArr36 = [5.6, 5.85, 6.1, 6.4, 6.65, 6.4, 6.15, 6, 5.75, 5.5, 5.25, 5, 3.45],
    businessShortRateArr60 = [5.96, 6.22, 6.45, 6.65, 6.9, 6.65, 6.4, 6, 5.75, 5.5, 5.25, 5, 4.2],
    businessLongRateArr = [6.14, 6.4, 6.6, 6.8, 7.05, 6.8, 6.55, 6.15, 5.9, 5.65, 5.4, 5.15, 4.2],
    PAFShortRateArr = [3.5, 3.75, 4, 4.2, 4.45, 4.2, 4, 3.75, 3.5, 3.25, 3, 2.75, 2.75],
    PAFLongRateArr = [4.05,
        4.3, 4.5, 4.7, 4.45, 4.7, 4.5, 4.25, 4, 3.75, 3.5, 3.25, 3.25
    ],
    loanType = 0,
    loanPeriods = 240,
    businessPeriodType = 4,
    PAFPeriodType = 1,
    businessRateType = 12,
    PAFRateType = 12,
    businessDiscount = 1,
    showResultTabID = 1,
    simpleDataTableMaxLines = 10,
    BLinkStatus = 0;
$(function() {
    $("#business_calc").on("click", function() {
        0 <= $(this).attr("class").indexOf("normal-tab") && ($(this).removeClass("normal-tab").addClass("select-tab").siblings(".tab").removeClass("select-tab").addClass("normal-tab"), $("#business_sum_line").show(), $("#business_rate_select_line").show(), $("#business_rate_value_line").show(), $("#PAF_sum_line").hide(), $("#PAF_rate_line").hide(), $("#business_interest_total_debx").hide(), $("#PAF_interest_total_debx").hide(), $("#business_interest_total_debj").hide(),
            $("#PAF_interest_total_debj").hide(), $("#business_atc_recmd_mod").show(), $("#PAF_atc_recmd_mod").hide(), loanType = 0)
    });
    $("#PAF_calc").on("click", function() {
        0 <= $(this).attr("class").indexOf("normal-tab") && ($(this).removeClass("normal-tab").addClass("select-tab").siblings(".tab").removeClass("select-tab").addClass("normal-tab"), $("#PAF_sum_line").show(), $("#PAF_rate_line").show(), $("#business_sum_line").hide(), $("#business_rate_select_line").hide(), $("#business_rate_value_line").hide(), $("#business_interest_total_debx").hide(),
            $("#PAF_interest_total_debx").hide(), $("#business_interest_total_debj").hide(), $("#PAF_interest_total_debj").hide(), $("#PAF_atc_recmd_mod").show(), $("#business_atc_recmd_mod").hide(), loanType = 1)
    });
    $("#mix_calc").on("click", function() {
        0 <= $(this).attr("class").indexOf("normal-tab") && ($(this).removeClass("normal-tab").addClass("select-tab").siblings(".tab").removeClass("select-tab").addClass("normal-tab"), $("#business_sum_line").show(), $("#business_rate_select_line").show(), $("#business_rate_value_line").show(),
            $("#PAF_sum_line").show(), $("#PAF_rate_line").show(), $("#business_interest_total_debx").show(), $("#PAF_interest_total_debx").show(), $("#business_interest_total_debj").show(), $("#PAF_interest_total_debj").show(), $("#business_atc_recmd_mod").show(), $("#PAF_atc_recmd_mod").hide(), loanType = 2)
    });
    $(".result-tab").on("click", function() {
        if (0 <= $(this).attr("class").indexOf("normal-tab")) {
            $(this).removeClass("normal-tab").addClass("select-tab").siblings(".result-tab").removeClass("select-tab").addClass("normal-tab");
            var a = $(this).attr("tab-id");
            $("#result_data_" + a).show().siblings(".result-data").hide();
            showResultTabID = parseInt(a)
        }
    });
    $("#loan_period_select").on("change", function() {
        var a = parseInt($(this).val());
        0 == a ? (loanPeriods = 6, PAFPeriodType = businessPeriodType = 0) : 1 == a ? (loanPeriods = 12 * a, businessPeriodType = 1, PAFPeriodType = 0) : 3 >= a ? (loanPeriods = 12 * a, businessPeriodType = 2, PAFPeriodType = 0) : 5 >= a ? (loanPeriods = 12 * a, businessPeriodType = 3, PAFPeriodType = 0) : (loanPeriods = 12 * a, businessPeriodType = 4, PAFPeriodType = 1);
        $("#loan_period_select_bar").text($(this).find("option:selected").text());
        $("#loan_period_select_bar").val($(this).val());
        "auto" == $("#business_rate_select").attr("input-method") && businessRateUpdate();
        "auto" == $("#PAF_rate_select").attr("input-method") && PAFRateUpdate()
    });
    $("#business_rate_select").on("change", function() {
        var a = $(this).val();
        businessRateType = a;
        $("#business_rate_select_bar").text($(this).find("option:selected").text());
        $("#business_rate_select_bar").val($(this).val()); - 1 == a ? ($("#business_discount_field").hide(), $("#business_rate_select_field").removeClass("long-field"),
            $("#business_rate").val(""), $(this).attr("input-method", "hand")) : 0 <= a && ("hand" == $(this).attr("input-method") && ($("#business_rate_select_field").addClass("long-field"), $("#business_discount_field").show(), $(this).attr("input-method", "auto")), businessRateUpdate())
    });
    $("#business_discount").on("change", function() {
        businessDiscount = parseFloat($(this).find("option:selected").attr("data-discount"));
        $("#business_discount_bar").text($(this).find("option:selected").text());
        $("#business_discount_bar").attr("data-discount",
            $(this).find("option:selected").attr("data-discount"));
        businessRateUpdate()
    });
    $("#PAF_rate_select").on("change", function() {
        var a = $(this).val();
        PAFRateType = a;
        $("#PAF_rate_select_bar").text($(this).find("option:selected").text());
        $("#PAF_rate_select_bar").val($(this).val()); - 1 == a ? ($("#PAF_rate").val(""), $(this).attr("input-method", "hand")) : 0 <= a && ("hand" == $(this).attr("input-method") && $(this).attr("input-method", "auto"), PAFRateUpdate())
    });
    $("#calculate").on("click", function() {
        userInputCheck() && (calculate(),
            window.scrollTo("0", "0"), $("[view=calc_input]").hide(), $("[view=calc_result]").show())
    });
    $("#recalculate").on("click", function() {
        window.scrollTo("0", "0");
        $("[view=calc_result]").hide();
        $("[view=calc_input]").show()
    });
    $(".view-more").on("click", function() {
        var a = $(this).attr("data-detail");
        $("#data_detail_" + a).show().siblings(".data-container").hide();
        window.scrollTo("0", "0");
        $("[view=calc_result]").hide();
        $("[view=data_detail]").show();
        $("#data_detail_bar").show()
    });
    $("#back_to_calc_input").on("click",
        function() {
            window.scrollTo("0", "0");
            $("[view=calc_result]").hide();
            $("[view=calc_input]").show()
        });
    $("#back_to_calc_result").on("click", function() {
        window.scrollTo("0", "0");
        $("#data_detail_bar").hide();
        $("[view=data_detail]").hide();
        $("[view=calc_result]").show()
    });
    $('[ad-type="cpa"]').on("click", function() {
        window.location.href = $(this).attr("ad-url")
    });
    $('[link-type="A_Link"]').on("click", function() {
        0 == BLinkStatus && ($('[link-type="B_Link"]').each(function() {
                $(this).attr("href", $(this).attr("href2"))
            }),
            BLinkStatus = 1)
    });
    $('[link-type="B_Link"]').on("click", function() {
        0 == BLinkStatus && ($(this).addClass("clicked"), $('[link-type="B_Link"]:not(.clicked)').each(function() {
            $(this).attr("href", $(this).attr("href2"))
        }), BLinkStatus = 1)
    });
    $(".loan-search-module #FormDaikuan").submit(function(a) {
        var b = !0,
            d = !0,
            f = $.trim($('.loan-search-module input[name="loan_limit"]').val()),
            c = $.trim($('.loan-search-module input[name="loan_term"]').val()),
            g = $(".loan-search-module .warning"),
            e = "";
        0 == f.length ? (b = !1, e = "请输入贷款金额") :
            (f = parseFloat(f), 0 == f ? (b = !1, e = "贷款金额不能为0") : 700 <= f && (b = !1, e = "贷款金额太大 请核对"));
        0 == c.length ? (d = !1, e += " 请输入贷款期限") : (c = parseInt(c), 0 == c ? (d = !1, e += " 贷款期限不能为0") : 120 < c && (d = !1, e += " 贷款期限不能超过10年"));
        b && d ? (g.text(""), g.hide()) : (g.text(e), g.show(), a.preventDefault())
    })
});

function businessRateUpdate() {
    var a = 0;
    0 == businessPeriodType ? a = businessShortRateArr6[businessRateType] : 1 == businessPeriodType ? a = businessShortRateArr12[businessRateType] : 2 == businessPeriodType ? a = businessShortRateArr36[businessRateType] : 3 == businessPeriodType ? a = businessShortRateArr60[businessRateType] : 4 == businessPeriodType && (a = businessLongRateArr[businessRateType]);
    a *= businessDiscount;
    a = Math.round(100 * a) / 100;
    $("#business_rate").val("" + a)
}

function PAFRateUpdate() {
    var a = 0;
    0 == PAFPeriodType ? a = PAFShortRateArr[PAFRateType] : 1 == PAFPeriodType && (a = PAFLongRateArr[PAFRateType]);
    $("#PAF_rate").val("" + a)
}

function userInputCheck() {
    if (0 == loanType) {
        var a = businessSumInputCheck(),
            b = businessRateInputCheck();
        return a && b ? !0 : !1
    }
    if (1 == loanType) {
        var d = PAFSumInputCheck(),
            f = PAFRateInputCheck();
        return d && f ? !0 : !1
    }
    if (2 == loanType) return a = businessSumInputCheck(), b = businessRateInputCheck(), d = PAFSumInputCheck(), f = PAFRateInputCheck(), a && b && d && f ? !0 : !1
}

function businessSumInputCheck() {
    var a = $.trim($("#business_sum").val()),
        b = /^\d*[\.]?\d*$/;
    if ("" != a && b.test(a)) return !0;
    $("#business_sum").val("").focus();
    return !1
}

function businessRateInputCheck() {
    var a = $.trim($("#business_rate").val()),
        b = /^\d*[\.]?\d*$/;
    if ("" != a && b.test(a)) return !0;
    $("#business_rate").val("").focus();
    return !1
}

function PAFSumInputCheck() {
    var a = $.trim($("#PAF_sum").val()),
        b = /^\d*[\.]?\d*$/;
    if ("" != a && b.test(a)) return !0;
    $("#PAF_sum").val("").focus();
    return !1
}

function PAFRateInputCheck() {
    var a = $.trim($("#PAF_rate").val()),
        b = /^\d*[\.]?\d*$/;
    if ("" != a && b.test(a)) return !0;
    $("#PAF_rate").val("").focus();
    return !1
}

function calculate() {
    calculate_debx();
    calculate_debj();
    var a = $('input[name="repayType"]:checked').val();
    $("#result_tab_" + a).removeClass("normal-tab").addClass("select-tab").siblings(".result-tab").removeClass("select-tab").addClass("normal-tab");
    $("#result_data_" + a).show().siblings(".result-data").hide();
    showResultTabID = a
}

function calculate_debx() {
    if (0 == loanType) var a = 1E4 * parseFloat($.trim($("#business_sum").val())),
        b = parseFloat($.trim($("#business_rate").val())) / 1200,
        a = calculate_debx_singleLoan(a, b);
    else if (1 == loanType) a = 1E4 * parseFloat($.trim($("#PAF_sum").val())), b = parseFloat($.trim($("#PAF_rate").val())) / 1200, a = calculate_debx_singleLoan(a, b);
    else if (2 == loanType) var a = 1E4 * parseFloat($.trim($("#business_sum").val())),
        b = parseFloat($.trim($("#business_rate").val())) / 1200,
        d = 1E4 * parseFloat($.trim($("#PAF_sum").val())),
        f = parseFloat($.trim($("#PAF_rate").val())) / 1200,
        a = calculate_debx_doubleLoan(a, b, d, f);
    return a
}

function calculate_debx_singleLoan(a, b) {
    var d, f, c, g, e, j = a * loanPeriods * b * Math.pow(1 + b, loanPeriods) / (Math.pow(1 + b, loanPeriods) - 1) - a,
        j = Math.round(100 * j) / 100;
    d = Math.round(100 * (j + a)) / 100;
    $("#interest_total_1").text(j + "元");
    $("#repay_total_1").text("" + d + "元");
    f = d / loanPeriods;
    f = Math.round(100 * f) / 100;
    var m = 0,
        h = "",
        i = "";
    for (d = 1; d <= loanPeriods; d++) c = a * b * (Math.pow(1 + b, loanPeriods) - Math.pow(1 + b, d - 1)) / (Math.pow(1 + b, loanPeriods) - 1), c = Math.round(100 * c) / 100, g = f - c, g = Math.round(100 * g) / 100, e = a * (Math.pow(1 + b, loanPeriods) -
        Math.pow(1 + b, d)) / (Math.pow(1 + b, loanPeriods) - 1), e = Math.round(100 * e) / 100, h += "<tr>", h = h + "<td>" + d + "</td>", h = h + "<td>" + f + "</td>", h = h + "<td>" + c + "</td>", h = h + "<td>" + g + "</td>", h = h + "<td>" + e + "</td>", h += "</tr>", 1 == d && (m = c), d == simpleDataTableMaxLines && (i = h);
    $("#standard_data_table_1").html("" + h);
    "" == i && (i = h);
    $("#simple_data_table_1").html("" + i);
    $("#repay_monthly_1").text(f + "元");
    $("#interest_monthly_1").text(m + "元");
    return j
}

function calculate_debx_doubleLoan(a, b, d, f) {
    var c, g, e, j, m;
    c = a * loanPeriods * b * Math.pow(1 + b, loanPeriods) / (Math.pow(1 + b, loanPeriods) - 1) - a;
    c = Math.round(100 * c) / 100;
    e = c + a;
    g = d * loanPeriods * f * Math.pow(1 + f, loanPeriods) / (Math.pow(1 + f, loanPeriods) - 1) - d;
    g = Math.round(100 * g) / 100;
    j = g + d;
    var h;
    h = Math.round(100 * (c + g)) / 100;
    e = Math.round(100 * (e + j)) / 100;
    $("#business_interest_total_1").text(c + "元");
    $("#PAF_interest_total_1").text(g + "元");
    $("#interest_total_1").text(h + "元");
    $("#repay_total_1").text(e + "元");
    g = e / loanPeriods;
    g = Math.round(100 *
        g) / 100;
    var i = 0,
        k = "",
        l = "";
    for (c = 1; c <= loanPeriods; c++) e = a * b * (Math.pow(1 + b, loanPeriods) - Math.pow(1 + b, c - 1)) / (Math.pow(1 + b, loanPeriods) - 1), e += d * f * (Math.pow(1 + f, loanPeriods) - Math.pow(1 + f, c - 1)) / (Math.pow(1 + f, loanPeriods) - 1), e = Math.round(100 * e) / 100, j = g - e, j = Math.round(100 * j) / 100, m = a * (Math.pow(1 + b, loanPeriods) - Math.pow(1 + b, c)) / (Math.pow(1 + b, loanPeriods) - 1), m += d * (Math.pow(1 + f, loanPeriods) - Math.pow(1 + f, c)) / (Math.pow(1 + f, loanPeriods) - 1), m = Math.round(100 * m) / 100, k += "<tr>", k = k + "<td>" + c + "</td>", k = k + "<td>" + g + "</td>",
        k = k + "<td>" + e + "</td>", k = k + "<td>" + j + "</td>", k = k + "<td>" + m + "</td>", k += "</tr>", 1 == c && (i = e), c == simpleDataTableMaxLines && (l = k);
    $("#standard_data_table_1").html("" + k);
    "" == l && (l = k);
    $("#simple_data_table_1").html("" + l);
    $("#repay_monthly_1").text(g + "元");
    $("#interest_monthly_1").text(i + "元");
    return h
}

function calculate_debj() {
    if (0 == loanType) var a = 1E4 * parseFloat($.trim($("#business_sum").val())),
        b = parseFloat($.trim($("#business_rate").val())) / 1200,
        a = calculate_debj_singleLoan(a, b);
    else if (1 == loanType) a = 1E4 * parseFloat($.trim($("#PAF_sum").val())), b = parseFloat($.trim($("#PAF_rate").val())) / 1200, a = calculate_debj_singleLoan(a, b);
    else if (2 == loanType) var a = 1E4 * parseFloat($.trim($("#business_sum").val())),
        b = parseFloat($.trim($("#business_rate").val())) / 1200,
        d = 1E4 * parseFloat($.trim($("#PAF_sum").val())),
        f = parseFloat($.trim($("#PAF_rate").val())) / 1200,
        a = calculate_debj_doubleLoan(a, b, d, f);
    return a
}

function calculate_debj_singleLoan(a, b) {
    var d, f, c, g, e, j = a * b * (loanPeriods + 1) / 2,
        j = Math.round(100 * j) / 100;
    d = Math.round(100 * (j + a)) / 100;
    $("#interest_total_2").text("" + j + "元");
    $("#repay_total_2").text("" + d + "元");
    g = a / loanPeriods;
    g = Math.round(100 * g) / 100;
    var m = 0,
        h = 0,
        i = "",
        k = "";
    for (d = 1; d <= loanPeriods; d++) c = a * b * (loanPeriods - d + 1) / loanPeriods, c = Math.round(100 * c) / 100, f = c + g, f = Math.round(100 * f) / 100, e = a * (loanPeriods - d) / loanPeriods, e = Math.round(100 * e) / 100, i += "<tr>", i = i + "<td>" + d + "</td>", i = i + "<td>" + f + "</td>", i = i + "<td>" +
        c + "</td>", i = i + "<td>" + g + "</td>", i = i + "<td>" + e + "</td>", i += "</tr>", 1 == d && (m = f, h = c), d == simpleDataTableMaxLines && (k = i);
    $("#standard_data_table_2").html("" + i);
    "" == k && (k = i);
    $("#simple_data_table_2").html("" + k);
    $("#repay_monthly_2").text(m + "元");
    $("#interest_monthly_2").text(h + "元");
    return j
}

function calculate_debj_doubleLoan(a, b, d, f) {
    var c, g, e, j, m;
    c = a * b * (loanPeriods + 1) / 2;
    c = Math.round(100 * c) / 100;
    e = c + a;
    g = d * f * (loanPeriods + 1) / 2;
    g = Math.round(100 * g) / 100;
    j = g + d;
    var h;
    h = Math.round(100 * (c + g)) / 100;
    e = Math.round(100 * (e + j)) / 100;
    $("#business_interest_total_2").text(c + "元");
    $("#PAF_interest_total_2").text(g + "元");
    $("#interest_total_2").text(h + "元");
    $("#repay_total_2").text(e + "元");
    j = (a + d) / loanPeriods;
    j = Math.round(100 * j) / 100;
    var i = 0,
        k = 0,
        l = "",
        n = "";
    for (c = 1; c <= loanPeriods; c++) e = a * b * (loanPeriods - c + 1) / loanPeriods,
        e += d * f * (loanPeriods - c + 1) / loanPeriods, e = Math.round(100 * e) / 100, g = e + j, g = Math.round(100 * g) / 100, m = a * (loanPeriods - c) / loanPeriods, m += d * (loanPeriods - c) / loanPeriods, m = Math.round(100 * m) / 100, l += "<tr>", l = l + "<td>" + c + "</td>", l = l + "<td>" + g + "</td>", l = l + "<td>" + e + "</td>", l = l + "<td>" + j + "</td>", l = l + "<td>" + m + "</td>", l += "</tr>", 1 == c && (i = g, k = e), c == simpleDataTableMaxLines && (n = l);
    $("#standard_data_table_2").html("" + l);
    "" == n && (n = l);
    $("#simple_data_table_2").html("" + n);
    $("#repay_monthly_2").text(i + "元");
    $("#interest_monthly_2").text(k +
        "元");
    return h
};