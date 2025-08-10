import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#0a0a0a' },
  headerContainer: {
    backgroundColor: '#0a0a0a',
  },
  headerGradient: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
  },
  avatar: {
    borderRadius: 9999,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  nameBlock: { flex: 1 },
  name: { color: '#ffffff', fontSize: 22, fontWeight: '700' },
  subtitle: { color: '#a1a1aa', fontSize: 13, marginTop: 2 },
  editBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  editBtnText: { color: '#fff', fontWeight: '600' },

  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 12,
    marginHorizontal: 4,
  },
  statLabel: { color: '#a1a1aa', fontSize: 12 },
  statValue: { color: '#fff', fontSize: 18, fontWeight: '700', marginTop: 2 },

  list: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 24 },
  sectionTitle: { color: '#d4d4d8', fontSize: 13, marginTop: 16, marginBottom: 6 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.06)',
  },
  rowIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  rowTextWrap: { flex: 1 },
  rowTitle: { color: '#fff', fontSize: 15, fontWeight: '600' },
  rowSubtitle: { color: '#a1a1aa', fontSize: 12, marginTop: 2 },
  chevron: { marginLeft: 8 },
});


