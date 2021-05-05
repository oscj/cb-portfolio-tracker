import 'package:flutter/material.dart';
import 'shared/colors.dart' as appColors;
import 'detailed-asset-view/detailedAssetView.dart';
import 'portfolio-overview/portfolioOverview.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Coinbase Portfolio Tracker',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key key, this.title}) : super(key: key);

  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: <Widget>[Text(''), Text('cb-portfolio-tracker')],
        ),
        backgroundColor: appColors.Colors.mainDark,
      ),
      body: Column(children: [
        PortfolioOverview(),
        DetailedAssetView(),
      ]),
    );
  }
}
