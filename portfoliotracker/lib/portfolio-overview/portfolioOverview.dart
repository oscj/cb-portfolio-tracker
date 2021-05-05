import 'package:flutter/material.dart';
import 'package:portfoliotracker/shared/statCard.dart';
import 'package:portfoliotracker/shared/colors.dart' as colorPallete;

class PortfolioOverview extends StatefulWidget {
  @override
  _PortfolioOverviewState createState() => _PortfolioOverviewState();
}

class _PortfolioOverviewState extends State<PortfolioOverview> {
  @override
  Widget build(BuildContext context) {
    return Container(
        child: Container(
            margin: EdgeInsets.all(10),
            width: MediaQuery.of(context).size.width,
            height: MediaQuery.of(context).size.height * 0.5,
            child: Container(
              child: Column(
                children: [
                  Center(
                    child: Text(
                      "Portfolio Overview",
                      style: TextStyle(
                          fontSize: 20,
                          fontWeight: FontWeight.bold,
                          color: colorPallete.Colors.mainDark),
                    ),
                  ),
                  StatCard(
                      title: "Total Investments",
                      content: "\$69.420",
                      contentColor: colorPallete.Colors.mainDark),
                  StatCard(
                      title: "Total Portfolio Value",
                      content: "\$69.420",
                      contentColor: colorPallete.Colors.mainDark),
                  StatCard(
                      title: "All Time Portfolio P/L",
                      content: "\$69.420",
                      contentColor: Colors.green)
                ],
              ),
            )));
  }
}
